<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Author;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class AuthorController extends AbstractController
{
    /**
     * @Route("/author", name="author")
     */
    public function index()
    {
        return $this->render('author/index.html.twig', [
            'controller_name' => 'AuthorController',
        ]);
    }

    /**
     * @Route("/add-author", name="add_author", methods={"POST"})
     * Add author to database list
     */
    public function addAuthor(Request $request) {

        $request = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager();

        date_default_timezone_set('America/Los_Angeles');

        $author = new Author();
        $author->setFirstName($request['first_name']['value']);
        $author->setLastName($request['last_name']['value']);
        $author->setGender($request['gender']['value']);
        $author->setImageUrl($request['image_url']['value']);
        $author->setBio($request['bio']['value']);
        $author->setModifiedDate(new \DateTime('@'.strtotime('now')));

        $em->persist($author);
        $em->flush();

        if($author->getId()) {
            $response = new Response($author->getId());
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
    }

    /**
     * @Route("/search-author-name", name="search_author_name", methods={"POST"})
     * Search author by name
     */
    public function searchAuthorName(Request $request) {
        $request = json_decode($request->getContent(), true);
        $query = $this->getDoctrine()->getRepository(Author::class)
            ->searchAuthorByName($request);
        $query = json_decode(json_encode($query), true);

        return new JsonResponse($query);
    }
}
