const torrentStream = require('torrent-stream');
const path = require('path');
const fs = require('fs');
const pump = require('pump');
const ffmpeg = require('fluent-ffmpeg');

export default function getTorrent(filename, magnetLink, req, res) {

    let downloadingStreams = {}

    // COVERSION
    const convert = function (file, thread) {
        if (!thread)
            thread = 8
        console.log('Start converting file...')
        return new ffmpeg(file.createReadStream())
            .videoCodec('libvpx')
            .audioCodec('libvorbis')
            .format('mp4')
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
            .on('error', function (err) { })
    }
    // INIT DOWNLOAD
    let engine = torrentStream(magnetLink)
    engine.on('ready', function () {
        console.log('Start Engine !')
        // // GET THE FILE
        console.log("MagnetLink => " + magnetLink)
        engine.files = engine.files.sort(function (a, b) {
            return b.length - a.length
        }).slice(0, 1)
        let file = engine.files[0]
        let ext = path.extname(file.name)
        console.log('File found! (' + file.name + ')')
        // downloadingStreams[filename] = file
        // CONVERT
        let needConvert = (ext !== '.webm' && ext !== '.mp4')
        console.log("Extension => " + ext)
        let videoStream = needConvert ? convert(file) : file.createReadStream();
        ext = needConvert ? '.mp4' : ext

        // MULTIPLE STREAMS
        let filePath = path.join(__dirname, '/../Downloads/' + filename + ext)
        const fileStream = fs.createWriteStream(filePath)
        engine.on('download', function () {
            console.log(file.name + " " + engine.swarm.downloaded / file.length * 100 + "% Downloaded");
            // if (engine.swarm.downloaded / file.length * 100 > 0.5)
            //     console.log("\n\n\n\n\n\n OK \n\n\n\n")
            // res.send({ status: "OK" })
        });
        res.on('close', function cb() {
            console.log("Connexion closed")
            engine.destroy(function cb() {
                console.log("Downloading Stopped")
            });
        });
        videoStream.on('end', () => {
            console.log('Video stream has reached is end')
        })
        if (needConvert) {
            console.log('Pumping to file...')
            pump(videoStream, fileStream)
        } else {
            console.log('Piping to file...')
            videoStream.pipe(fileStream)
        }
    })
}