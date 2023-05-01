
## Versatile Video processing tool
## Installation and requirements

##### To run the tool locally, you will need the following installed on your machine:
      Node.js (version 14.15.0 or higher)
      npm (version 6.14.8 or higher)
      ffmpeg (version 4.2 or higher)
##### To install the code and its dependencies, follow these steps:
``` git clone https://github.com/amschel99/video-editor ```


Navigate to the code's directory using the command line.

      
Run the command ```npm install```to install the dependencies

       
Run ``` npm run dev ``` to start the server using nodemon

 ## Uploading a video to edit
 #### Endpoint : POST /upload/main
 
 | Field | Type | Required | Description |
| --- | --- | --- | --- |
| video | File | Yes | The video file you want to upload |


When you upload a video it's saved as 0.mp4. This way the application will be able to distinguish the video file the other files. 

##### Example request

``` curl -X POST -F "video=@/home/amschel/Downloads/cart.mp4"  "http://localhost:5500/upload/main" ```

## Uploading Resource files
#### Endpoint: POST /video/resource

 | Field | Type | Required | Description |
| --- | --- | --- | --- |
| file | File | Yes | The resource file you want to upload |
| fileIntent | String enum | Yes | The intent of the file e.g watermark, overlay  |


Resource files are files that you want to use to edit the original video. This can be an image that you want to use as a watermark, a video that you want to overlay, an audio that you want to add to the original video, etc.You pass the intent of the resource file in the request query and the file will be saved with its intent as the filename. e.g If a file is to be used as an overlay, pass ```?fileIntent=overlay``` in the url endpoint.

##### Example request

``` curl -X POST   -H "Content-Type: multipart/form-data"   -F "file=@/home/amschel/Downloads/bot.jpeg"   -F "fileType=overlay"   "http://localhost:5500/upload/resource?fileType=overlay" ```

## Features
1. [Overlay](#overlay)

### <a id="overlay">Overlay</a>
This feature allows you to overlay an image or video on top of another video.
### Endpoint: POST /overlay

This endpoint overlays an image or video onto a video file.

#### Request
| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x_offset | Integer | Yes | The horizontal offset of the image/video to overlay relative to the top left corner of the original video frame |
| y_offset | Integer | Yes | The vertical offset of the image/video to overlay relative to the top left corner of the original video frame |
| start_time | Seconds | Yes | The time in seconds where the overlay of the video should start |
| end_time | Seconds | Yes | The time in seconds where the overlay of the video should stop |



## Example

### Request

``` curl -X POST   "http://localhost:5500/overlay?x_offset=10&y_offset=20&start_time=5&end_time=20"```

The application will look in a folder called uploads for a file whose name is suffixed with 0-. This file will be  treated as the the original video file to be edited. The file whose name starts with overlay will be used as the file to be added as an overlay.
The latter can be a video or image.


### Response

The response is a video file with the overlayed image or video.
When using curl, pass the ``` -- output ``` option since curl has no way of displaying binary data on the terminal.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
