
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
 #### Endpoint : POST /upload
 | Field | Type | Required | Description |
| --- | --- | --- | --- |

| files | File | Yes | The video file and any additional files you might want to upload e.g image files to overlay on top o the video. The original video file should be the first one to be uploaded. i.e req.files[0] | 

When you upload, a number suffix is added to the original file name such that the first file starts with 0, the second with 1 and so on and so forth. The suffix is used to identify which file is which. The application is able to know the original video file by looking at the suffix.

##### Example request

``` curl -X POST   "http://localhost:5500/overlay?x_offset=10&y_offset=20&start_time=5&end_time=20" ```

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
| y_offset | Integer | Yes | The vertical offset of the image/video to overlay relative to the top left corner of the original video frame|
| start_time | Seconds | Yes | The time in seconds where the overlay of the video shoud start |
| end_time | Seconds | Yes | The time in seconds where the overlay of the video shoud stop |



## Example

### Request

``` curl -X POST -F "files=@/home/amschel/Downloads/cart.mp4" -F "files=@/home/amschel/Downloads/bot.jpeg" "http://localhost:5500/overlay?x_offset=10&y_offset=20&start_time=5&end_time=10"```

The first file should be the original video that you want to add an overlay onto. It should be the first file in the request i.e req.files[0]
The second file should be the image or video that you want to use as an overlay. It should be the second in the request i.e req.file[1]

### Response

The response is a video file with the overlayed image or video.
When using curl, pass the ``` -- output ``` option since curl has no way of displaying binary data on the terminal.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
