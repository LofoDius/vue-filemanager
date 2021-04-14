const HTTP_STATUS = require('http-status');
const fs = require('fs')
const fpath = require('path')

const knownFileTypes = ['3DS', '3GP', '7Z', 'AAC', 'ACCDB',
    'AI', 'APNG', 'AS', 'AVI', 'BLEND', 'BMP', 'C', 'CDR', 'CFG',
    'CHM', 'CPT', 'CS', 'CSS', 'DDS', 'DDL', 'DOC', 'DOCX', 'DPS',
    'EMF', 'EML', 'EPS', 'EPUB', 'ET', 'FLA', 'FLAC', 'FLV', 'GIF',
    'HTM', 'HTML', 'ICO', 'INI', 'ISO', 'JC!', 'JP2', 'JPC', 'JPE',
    'JPEG', 'JPG', 'LOG', 'LZH', 'MDF', 'MDS', 'MHT', 'MHTML', 'MIDI',
    'MKV', 'MOV', 'MP3', 'MP4', 'MPEG', 'MPG', 'NFO', 'ODB', 'ODF',
    'ODG', 'ODP', 'ODS', 'ODT', 'OGA', 'OGG', 'OGM', 'OGV', 'OTF',
    'OXPS', 'PART', 'PDF', 'PDN', 'PEA', 'PHP', 'PNG', 'PPT', 'PPTX',
    'PSD', 'PSP', 'PUB', 'RAR', 'RAW', 'RDF', 'RTF', 'SFV', 'SGML',
    'SKP', 'SQL', 'SRT', 'SUB', 'SVG', 'SVGZ', 'SWF', 'TAR', 'TCD',
    'TGA', 'TGZ', 'TIF', 'TIFF', 'TORRENT', 'TTF', 'TXT', 'VB',
    'WAV', 'WEBM', 'WEBP', 'WMA', 'WMF', 'WMV', 'WPS', 'XCF', 'XLS',
    'XLSX', 'XML', 'XPI', 'XPS', 'ZIP']

async function getDirectoryItemsHandler(req, res) {
    let {path} = req.body;
    if (!path && path !== "") {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST);
        return;
    }
    path = '/home/lofod/Documents/filemanager' + path;
    let body = []

    if (fs.existsSync(path)) {
        try {
            let dirItems = fs.readdirSync(path);
            dirItems.forEach((item) => {
                let filePath = path + '/' + item;
                let name = item;
                let itemStats = fs.statSync(filePath);
                let type = 'unknown';
                if(knownFileTypes.includes(fpath.extname(filePath).substring(1).toUpperCase()))
                    type = fpath.extname(filePath).substring(1).toUpperCase();

                if (itemStats.isDirectory()) {
                    body.push({
                        name,
                        path: filePath,
                        lastModified: itemStats.mtime,
                        type: 'directory',
                    });
                } else {
                    body.push({
                        name,
                        path: filePath,
                        lastModified: itemStats.mtime,
                        size: itemStats.size,
                        type: type
                    })
                }
            });
        } catch (e) {
            console.log('Найс путь');
            console.log(e);
            res.sendStatus(HTTP_STATUS.IM_A_TEAPOT);
            return;
        }
    } else {
        res.sendStatus(HTTP_STATUS.NOT_FOUND);
        return;
    }
    res.status(HTTP_STATUS.OK).json(body);
}

module.exports = getDirectoryItemsHandler;