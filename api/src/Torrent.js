const torrentStream = require('torrent-stream');
const path = require('path');
const fs = require('fs');
const pump = require('pump');
const ffmpeg = require('fluent-ffmpeg');

export default function getTorrent(filename, magnetLink) {

    console.log("\n\nFunction getTorrent ON!! ")
    let downloadingStreams = {}
    if (!filename || !magnetLink)
        return (false)

    // COVERSION
    const convert = function (file, thread) {
        if (!thread)
            thread = 8
        console.log('Start converting file...')
        return new ffmpeg(file.createReadStream())
            .videoCodec('libvpx')
            .audioCodec('libvorbis')
            .format('webm')
            .audioBitrate(128)
            .videoBitrate(1024)
            .outputOptions([
                '-threads ' + thread,
                '-deadline realtime',
                '-error-resilient 1'
            ])
            .on('end', function () {
                console.log('File is now webm !')
            })
            .on('error', function (err) {})
    }

    //DOWNLOADING

    console.log('Start downloading...')
    // INIT DOWNLOAD
    let engine = torrentStream(magnetLink)
    engine.on('ready', function () {
        console.log('Download ended!')
        // GET THE FILE
        engine.files = engine.files.sort(function (a, b) {
            return b.length - a.length
        }).slice(0, 1)
        let file = engine.files[0]
        let ext = path.extname(file.name)
        console.log('File found! (' + file.name + ')')
        downloadingStreams[filename] = file
        // CONVERT
        let needConvert = (ext !== '.webm' && ext !== '.mp4')
        let videoStream = needConvert ? convert(file) : file.createReadStream();
        console.log("\n\nInside Torrents js => " + ext)

        // MULTIPLE STREAMS
        let filePath = path.join(__dirname, '/../../ui/public/Downloads/' + filename + ext)
        let fileStream = fs.createWriteStream(filePath)
        videoStream.on('end', () => {
            console.log('Video stream has reached is end')
        })
        if (needConvert) {
            console.log('Pumping to res and file...')
            pump(videoStream, fileStream)
        } else {
            console.log('Piping to res and file...')
            videoStream.pipe(fileStream)
        }
    })
}