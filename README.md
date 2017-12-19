Backend Code Challenge

Create an express application exposing a single endpoint (/terms/{tid}/longest-preview-media-url) that returns the longest preview media URL. The term id ({tid}) will be used to supply an initial, internal API call to the Gaia backend.

Your response from the endpoint should look something like this:

{

  "bcHLS": "https://www.gaia.com/api/brightcove/proxy/96371/master.m3u8?expiration=1455832800&token=c522231dbad02ae0d5a9676c8c9f9d8df86d2181280df53b46ab0b24b257458a",

  "titleNid": 100176,

  "previewNid": 96371,

  "previewDuration": 90

}

There are three endpoints you will need to use to accomplish this task: http://d6api.gaia.com/vocabulary/1/{tid}http://d6api.gaia.com/videos/term/{tid} http://d6api.gaia.com/media/{previewNid}

Calls to the endpoints above should include the header Accept: application/json.

First, you’ll need to hit http://d6api.gaia.com/vocabulary/1/{tid} using the {tid} URL parameter in your endpoint path. Use 26681 for a testing {tid}. From this response, you’ll need to grab the first tid (26686) from the first object in the array from the terms property.

Second, you’ll hit http://d6api.gaia.com/videos/term/{tid} and supply {tid} with 26686 (retrieved programmatically).

Third, you’ll need to iterate over the response from http://d6api.gaia.com/videos/term/26686 and identify the preview node id (nid) (titles[i].preview.nid) that has the longest duration value (titles[i].preview.duration) from the array of objects from the titles property. note: this endpoint is paginated, but for this exercise you can use the first page of results

Finally, you’ll hit http://d6api.gaia.com/media/{nid} with the appropriate preview nid you determined in step 3. You’ll want to capture the URL from mediaUrls.bcHLS to include in your endpoint response.

Requirements:

Create a Github repo
Must run on Node LTS/boron
Must use Express library
Endpoint must return JSON
Errors must be handled and appropriate HTTP status codes returned
Here are some additional suggestions based upon our stack and coding practices:

Demonstrate knowledge of ES2015+ language features (include transpilation if necessary)
Demonstrate a firm grasp of asynchronous coding patterns (callbacks, promises, generators, async/await, whatever you prefer, but be consistent)
Demonstrate familiarity with testing node applications (both unit & integration tests as well as code coverage, we use mocha/chai/sinon/istanbul, but feel free to use whatever stack you're comfortable with)
Demonstrate a solid understanding of best practices regarding code/project organization and programming principles (SOLID, GRASP, 12 Factor App, etc)
Include a Dockerfile with instructions for testing & running
