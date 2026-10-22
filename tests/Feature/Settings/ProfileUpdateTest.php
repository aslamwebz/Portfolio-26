<?php

use App\Models\User;

test('starter settings endpoints are unavailable', function () {
    $this->actingAs(User::factory()->create());
    $this->get('/settings/profile')->assertNotFound();
    $this->patch('/settings/profile')->assertNotFound();
    $this->delete('/settings/profile')->assertNotFound();
});
