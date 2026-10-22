<?php

use App\Models\User;

test('the starter dashboard is unavailable to guests and accounts', function () {
    $this->get('/dashboard')->assertNotFound();
    $this->actingAs(User::factory()->create())->get('/dashboard')->assertNotFound();
});
