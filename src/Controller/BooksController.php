<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Author;
use App\Entity\Books;
use App\Entity\Publishers;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response as GResponse;

class BooksController extends AbstractController
{
    /**
     * @Route("/books", name="books")
     */
    public function index()
    {
        return $this->render('books/index.html.twig', [
            'controller_name' => 'BooksController',
        ]);
    }

    /**
     * @Route("/add-book", name="add_book", methods={"POST"})
     * Add book to database list
     */
    public function addBook(Request $request) {
        $request = json_decode($request->getContent(), true);
        $em = $this->getDoctrine()->getManager();

        date_default_timezone_set('America/Los_Angeles');

        $book = new Books();
        $book->setTitle(trim($request['title']['value']));
        $book->setAuthorId((int)$request['author_id']['value']);
        $book->setImageUrl($request['image_url']['value']);
        $book->setDescription($request['description']['value']);
        $book->setPublicationMonth((int)$request['publication_month']['value']);
        $book->setPublicationYear((int)$request['publication_year']['value']);
        $book->setPublisherId((int)$request['publisher_id']['value']);
        $book->setRating((int)$request['rating']['value']);
        $book->setPageCount((int)$request['page_count']['value']);
        $book->setModifiedDate(new \DateTime('@'.strtotime('now')));

        $em->persist($book);
        $em->flush();

        if($book->getId()) {
            $response = new Response($book->getId());
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
    }

    /**
     * @Route("/getFeaturedBooks", name="get_featured_books", methods={"GET"})
     */
    public function getFeaturedBooks() {
        $em = $this->getDoctrine()->getManager();

        $query = $em->getRepository(Books::class)
            ->findAll();

//        $res = json_decode(json_encode($query), true);
//        $res = new JsonResponse();

        return $query;
//        var_dump($query);
//        exit();
    }

    /**
     * @Route("/getBooksByAuthorFromGRAPI", name="get_books_by_author_from_gr_apo", methods={"GET"})
     * Get books by authors name searching through Goodread's API
     */
//    public function getBooksByAuthorFromGRAPI() {
//        $api_key = 'GP9rnuaGDy1vAgXU8urvg';
//        $api_url = 'https://www.goodreads.com/search/index.xml';
//
//        $client = new Client(['base_uri' => $api_url,'verify' => false]);
//        $req = $client->request('GET', '', [
//            'headers' => ['Accept' => 'application/xml'],
//            'query' => [
//                'key' => $api_key,
//                'q' => 'Maya Banks'
//            ]
//        ]);
//
//        $res = $req->getBody()->getContents();
//
//        var_dump($res);
//        exit();
//    }
}
