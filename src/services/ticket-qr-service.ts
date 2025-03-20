const QRCode = require('qrcode')

export async function generateTicketQrCode(id : string){
    const data = JSON.stringify({
        id: id
    })

    return await QRCode.toDataURL(data);
}