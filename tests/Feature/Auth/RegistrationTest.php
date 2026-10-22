<?php

test('registration screens and endpoints are disabled', function () {
    $this->get('/register')->assertNotFound();
    $this->post('/register', ['name' => 'Visitor', 'email' => 'visitor@example.com', 'password' => 'password', 'password_confirmation' => 'password'])->assertNotFound();
    $this->assertDatabaseMissing('users', ['email' => 'visitor@example.com']);
});
