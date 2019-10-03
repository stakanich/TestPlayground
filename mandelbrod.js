function createImage()
{
    console.log("Drawing");
    var c = document.getElementById("someCanvas");
    var ctx = c.getContext("2d");
    var wgt = 200
    var hgt = 200

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
            for (var kx = 0.0; kx < wgt; kx++)
            {
                var ca = xa + (((xb-xa)*kx) / wgt);
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
    
}
