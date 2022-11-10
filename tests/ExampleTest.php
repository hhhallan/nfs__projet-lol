<?php

use App\Tests\Feature\FeatureTestCase;

describe('Some test', function() {
    iit('Should test something', function() {
        $client = FeatureTestCase::getClient();
        $client->request('GET', 'http://127.0.0.1:8000/api/v1/summoners/by-name/brun');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        // $this->assertEquals(200, );
    });
    iit('Should test something else', function() {
        $this->assertEquals(200, 200);
    });
});
