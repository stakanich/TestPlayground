function createImage()
{
    //console.log("Drawing");
    var c = document.getElementById("someCanvas");
    var ctx = c.getContext("2d");
    var wdt = 400
    var hgt = 400

    function drawPix(x, y, r, g, b)
    {
        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.fillRect(x, y, 1, 1);
    }

    var nxtxa = -2.0;
    var nxtxb = 1.0;
    var nxtya = -1.5;
    var nxtyb = 1.5;

    var curxa = -2.0;
    var curxb = 1.0;
    var curya = -1.5;
    var curyb = 1.5;
    var maxIt = 100;

    function drawSet(xa, xb, ya, yb)
    {
        for (var ky = 0.0; ky < hgt; ky++)
        {
            for (var kx = 0.0; kx < wdt; kx++)
            {
                var ca = xa + (((xb-xa)*kx) / wdt);
                var cb = ya + (((yb-ya)*ky) / hgt);

                var za = 0;
                var zb = 0;
                var i = 0;

                for (i = 0; i < maxIt; i++)
                {
                    var temp = za*za - zb*zb + ca;
                    zb = 2*za*zb + cb;
                    za = temp;
                    
                    var absZ = Math.sqrt(za*za + zb*zb);

                    if (absZ >= 10.0)
                    {
                        break;
                    }
                }
                var rd = (i*2.2) % 256;
                var gr = (i*2) % 256;
                var bl = (i*2.5) % 256;

                drawPix(kx, ky, rd, gr, bl);
            }
        }
    }
    
    function getMousePos(canv, evt)
    {
        var rect = canv.getBoundingClientRect();
        return
        {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    
    c.addEventListener('mousedown', function(evt){
        var coords = getMousePos(c, evt);
        nxtxa = curxa + (((curxb - curxa) * coords.x) / wdt;
        nxtya = curyx + (((curyb - curya) * coords.y) / hgt;
    });
    
    c.addEventListener('mouseup', function(evt){
        var coords = getMousePos(c, evt);
        nxtxb = curxa + (((curxb - curxa) * coords.x) / wdt;
        nxtyb = nxtya + nxtxb - nxtxa;
        curxa = nxtxa;
        curxb = nxtxb;
        curya = nxtya;
        curyb = nxtyb;
        drawSet(nxtxa, nxtxb, nxtya, nxtyb);
    }):
    
    drawSet(nxtxa, nxtxb, nxtya, nxtyb);
    
}
