<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.'], JSON_UNESCAPED_SLASHES);
    exit;
}

$configuredRecipient = 'team@mi9ai.com';

if ($configuredRecipient === 'replace-with-your-email@example.com') {
    http_response_code(503);
    echo json_encode(
        ['message' => 'The contact destination is not configured yet. Add your real email address inside public/contact.php before uploading.'],
        JSON_UNESCAPED_SLASHES
    );
    exit;
}

$rawBody = file_get_contents('php://input');
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$payload = [];

if (stripos($contentType, 'application/json') !== false) {
    $decoded = json_decode($rawBody ?: '', true);
    if (is_array($decoded)) {
        $payload = $decoded;
    }
} elseif (!empty($_POST)) {
    $payload = $_POST;
} else {
    parse_str($rawBody ?: '', $payload);
}

$name = trim((string)($payload['name'] ?? ''));
$email = trim((string)($payload['email'] ?? ''));
$type = trim((string)($payload['type'] ?? ''));
$message = trim((string)($payload['message'] ?? ''));

if ($name === '' || $email === '' || $type === '' || $message === '') {
    http_response_code(400);
    echo json_encode(
        ['message' => 'Every field is required before we can open the channel.'],
        JSON_UNESCAPED_SLASHES
    );
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(
        ['message' => 'That email address does not look operational.'],
        JSON_UNESCAPED_SLASHES
    );
    exit;
}

$cleanName = preg_replace('/[\r\n]+/', ' ', $name) ?? $name;
$cleanEmail = preg_replace('/[\r\n]+/', '', $email) ?? $email;
$cleanType = preg_replace('/[\r\n]+/', ' ', $type) ?? $type;
$host = $_SERVER['HTTP_HOST'] ?? 'mi9.local';
$host = preg_replace('/:\d+$/', '', $host) ?? 'mi9.local';
$host = preg_replace('/[^a-z0-9.\-]/i', '', $host) ?? 'mi9.local';
$fromAddress = 'briefing@' . $host;

$subject = sprintf('[MI9] New %s briefing request from %s', strtoupper($cleanType), $cleanName);
$bodyLines = [
    'New MI9 contact request',
    'Name: ' . $cleanName,
    'Email: ' . $cleanEmail,
    'Type: ' . $cleanType,
    '',
    'Message:',
    $message
];

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: MI9 Website <' . $fromAddress . '>',
    'Reply-To: ' . $cleanEmail,
    'X-Mailer: PHP/' . phpversion()
];

$sent = mail(
    $configuredRecipient,
    $subject,
    implode("\n", $bodyLines),
    implode("\r\n", $headers)
);

if (!$sent) {
    http_response_code(500);
    echo json_encode(
        ['message' => 'The transmission failed on the server. Double-check the recipient address and hosting mail setup.'],
        JSON_UNESCAPED_SLASHES
    );
    exit;
}

echo json_encode(
    ['ok' => true, 'message' => 'Transmission received. MI9 will reach out shortly.'],
    JSON_UNESCAPED_SLASHES
);
