<?php
namespace App\Controllers;
use CodeIgniter\HTTP\IncomingRequest;
use App\Models\UserModel;
class Home extends BaseController
{
    public $requets,$session;
    public function __construct(){
        //parent::__construct();
        $this->request = service('request');
        $this->session = \Config\Services::session();
    }     
    public function index()
    {
    }
    public function main()
    {
        if($this->session->get('email')!=NULL){
           return redirect()->to('upload'); 
        }        
        return view('header').view('main').view('footer');
    }
    public function create()
    {
        if($this->session->get('email')!=NULL){
           return redirect()->to('upload'); 
        }        
        return view('header').view('create').view('footer');
    }
    public function download()
    {
        if($this->session->get('email')==NULL){
           return redirect()->to('/'); 
        }
        return view('header').view('topmenu',array("session"=>$this->session)).view('download').view('footer');
    }
    public function upload()
    {
        if($this->session->get('email')==NULL){
           return redirect()->to('/'); 
        }
        return view('header').view('topmenu',array("session"=>$this->session)).view('upload').view('footer');
    }
    public function hash($password)
    {
        $hash = md5($password);
        return $hash;
    }    
    public function signup()
    {
        //print_r($this->request->getPost());die;
        $data=array(
            'email'=>$this->request->getPost('email'),
            'password'=>$this->hash($this->request->getPost('password')),
            'cpassword'=>$this->request->getPost('password')
        );        
        $userModel = new UserModel();
        $users=$userModel->insertUsers($data);
        $users=(array) json_decode($users);
        //print_r($users);
        if($users['transaction']=="1"){
            //return view('header').view('topmenu').view('upload').view('footer');   
            //redirect()->to(base_url()."upload");
        }else{
            //echo "redirecting for login2";
        }
        return redirect()->to('/'); 
    }
    public function login()
    {
        $data=array(
            'email'=>$this->request->getPost('email'),
            'password'=>$this->hash($this->request->getPost('password'))
        );        
        $userModel = new UserModel();
        $user_data=$userModel->getUser($data);
        $user=(array) json_decode($user_data);
        //print_r($user);die;
        if($user['transaction']=="1"){
            $ud=(array) $user['data'][0];
            //print_r($ud);
        $newdata = [
                'id'  => $ud['id'],
                'email'     => $ud['email']
        ];

        $this->session->set($newdata);
            return redirect()->to('upload');
        }else{
            return redirect()->to('/');
        }
    }    
    public function logout()
    {
        $this->session->destroy();
        return redirect()->to('/');
    }    
}