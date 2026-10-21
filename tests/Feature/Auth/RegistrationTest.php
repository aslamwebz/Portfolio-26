<?php

use Laravel\Fortify\Features;

test('registration screen cannot be rendered when registration is disabled', function () {
    $response = $this->get('/register');

    if (Features::enabled(Features::registration())) {
        $response->assertOk();
    } else {
        $response->assertNotFound();
    }
});

test('new users cannot register when registration is disabled', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    if (Features::enabled(Features::registration())) {
        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    } else {
        $response->assertNotFound();
        $this->assertGuest();
    }
});
