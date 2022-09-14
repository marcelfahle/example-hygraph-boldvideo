## How to use

### Hygraph

1. Under Schema -> Remote Sources, add a remote resource for Bold
  - Display Name `Bold`
  - Type `REST`
  - Base URL `https://app.boldvideo.io/api`
  - Headers 
    - Key: `Authorization` 
    - Value: [your API Key](https://app.boldvideo.io/settings)
  - Custom Type Definition
    **Root**
    ```
      type Root {
        data: Video
      }
    ```

    **Video**
    ```
    type Video {
      captions: String
      captions_label: String
      captions_lang: String
      description: String
      duration: Float
      id: String
      legacy_video_url: String
      playback_id: String
      provider_asset_id: String
      published_at: String
      stream_url: String
      teaser: String
      thumbnail: String
      title: String
      transcription: String
      type: String
    }
    ```

2. Add a `Lessons` Schema
  - Add a `Title` (Single Line Text), `Description` (multi line), a `Video ID` (string) and the newly created remote resource with the following setttings:
    - Display Name: `Bold Video`
    - API ID `boldVideo`
    - Remote source: `Bold`
    - Method: `GET`
    - Return Type: `Root`
    - Path: `/videos/{{doc.videoId}}` (thanks dude!)



### Next.js

1. Add an `.env` file with your hygraph URL `HYGRAPH_URL`

2. Start the server :) 
