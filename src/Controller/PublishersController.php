<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Publishers;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class PublishersController extends AbstractController
{
    /**
     * @Route("/publishers", name="publishers")
     */
    public function index()
    {
        return $this->render('publishers/index.html.twig', [
            'controller_name' => 'PublishersController',
        ]);
    }

    /**
     * @Route("/search-publisher-name", name="search_publisher_name", methods={"POST"})
     * Search publisher by name
     */
    public function searchPublisherName(Request $request) {
        $request = json_decode($request->getContent(), true);
        $query = $this->getDoctrine()->getRepository(Publishers::class)
            ->searchPublisherByName($request);
        $query = json_decode(json_encode($query), true);

        return new JsonResponse($query);
    }
}
