<?php

use App\Models\User;

test('starter settings endpoints are unavailable', function () {
    $this->actingAs(User::factory()->create());
    $this->get('/settings/two-factor')->assertNotFound();
    $this->get('/settings/appearance')->assertNotFound();
    $this->get('/settings')->assertNotFound();
});
