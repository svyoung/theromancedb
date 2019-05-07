<?php
/**
 * Created by PhpStorm.
 * User: Sam Young
 * Date: 4/1/2019
 * Time: 8:29 PM
 */
namespace App\Controller;

use function GuzzleHttp\Psr7\str;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use GuzzleHttp\Client;

class HomeController extends AbstractController {

    /**
     * @Route("/", name="home")
     */
    public function index()
    {

        $client = new Client([
            'verify' => false,
        ]);
        $req = $client->get($this->getParameter('gr_url') . 'series/list/92650.xml?key=' . $this->getParameter('gr_key'));
        $array = json_decode(json_encode(simplexml_load_string($req->getBody()->getContents())), true);


//        echo '<pre>' .var_export($array['series_works'], true).'</pre>';

        return $this->render('index.html.twig');
    }
}