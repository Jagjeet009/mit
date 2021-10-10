<?php
namespace App\Models;
use CodeIgniter\Model;
class UserModel extends Model
{
    protected $db,$builder,$userModel,$request;
    public function __construct()
    {
        parent::__construct();
        $this->db = \Config\Database::connect();
        $this->builder = $this->db->table('users'); 
    }
    function insertUsers($data){
        //print_r($data);
        $new_id=0;
        $builder = $this->db->table('users');
        $builder->select('email');
        $builder->where('email', $data['email']);          
        $query=$builder->get();
        $result_json='';
        if (count($query->getResult()) > 0){
            $result_json=json_encode(array("transaction"=>0,"message"=>"Email Id Exist!"));
        }
        else{
            $this->db->table("users")->insert($data);
            $new_id=$this->db->insertID();        
            $result_json=json_encode(array("transaction"=>1,"message"=>"User Created!","id_created"=>$new_id));
        }    
        //echo $result_json;
        return $result_json;
    }
    function getUser($data){
        //print_r($data);
        $builder = $this->db->table('users');
        $builder->select('*');
        $builder->where('email', $data['email']);          
        $builder->where('password', $data['password']);          
        $query=$builder->get();
        //echo $this->db->getLastQuery();
        $result_json='';
        if (count($query->getResult()) > 0){
            $result_json=json_encode(array("transaction"=>1,"message"=>"Login Sucessfull!","data"=>$query->getResult()));
        }
        else{
            $result_json=json_encode(array("transaction"=>0,"message"=>"Access Denied!"));
        }    
        //echo $result_json;
        return $result_json;
    }    
}