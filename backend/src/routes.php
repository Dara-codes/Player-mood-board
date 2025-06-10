<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

require_once __DIR__ . '/db.php';

return function (App $app) {

    // Test route
    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write("Mood Board Backend is running.");
        return $response;
    });

    // POST /mood
    $app->post('/mood', function (Request $request, Response $response) {
        $data = json_decode($request->getBody()->getContents(), true);
        $emoji = $data['emoji'] ?? null;

        if (!in_array($emoji, ['happy', 'neutral', 'sad'])) {
            $response->getBody()->write(json_encode(['error' => 'Invalid emoji']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $db = getDBConnection();
        $stmt = $db->prepare("INSERT INTO moods (emoji, timestamp) VALUES (:emoji, :timestamp)");
        $stmt->execute([
            ':emoji' => $emoji,
            ':timestamp' => date('Y-m-d H:i:s')
        ]);

        $response->getBody()->write(json_encode(['message' => 'Mood saved']));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // GET /moods?date=YYYY-MM-DD
    $app->get('/moods', function (Request $request, Response $response) {
        // Default to today if not provided
        $params = $request->getQueryParams();
        $date = $params['date'] ?? date('Y-m-d'); 

        $db = getDBConnection();
        $stmt = $db->prepare("
            SELECT emoji, COUNT(*) as count 
            FROM moods 
            WHERE DATE(timestamp) = :date 
            GROUP BY emoji
        ");
        $stmt->execute([':date' => $date]);
        $results = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

        // Return 3 emoji types always 
        $summary = [
            'happy' => (int)($results['happy'] ?? 0),
            'neutral' => (int)($results['neutral'] ?? 0),
            'sad' => (int)($results['sad'] ?? 0),
        ];

        $response->getBody()->write(json_encode($summary));
        return $response->withHeader('Content-Type', 'application/json');
    });
};
