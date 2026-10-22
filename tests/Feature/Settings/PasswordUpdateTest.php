<?php

use App\Models\User;

test('starter settings endpoints are unavailable', function () {
    $this->actingAs(User::factory()->create());
    $this->get('/settings/password')->assertNotFound();
    $this->put('/settings/password')->assertNotFound();
});
