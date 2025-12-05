const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

let a = 1, b = 0, c = 0;
const scale = 40;

function updateValues() {
    a = parseFloat(document.getElementById('slider-a').value);
    b = parseFloat(document.getElementById('slider-b').value);
    c = parseFloat(document.getElementById('slider-c').value);

    document.getElementById('val-a').innerText = a;
    document.getElementById('val-b').innerText = b;
    document.getElementById('val-c').innerText = c;

    updateInfo();
    draw();
}

function updateInfo() {
    const vertexX = -b / (2*a);
    const vertexY = a*vertexX*vertexX + b*vertexX + c;
    document.getElementById('vert').innerText = `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`;

    const disc = b*b - 4*a*c;
    document.getElementById('disc').innerText = disc.toFixed(2);

    if (disc < 0) {
        document.getElementById('roots').innerText = "Não possui raízes reais";
    } else {
        const x1 = (-b + Math.sqrt(disc)) / (2*a);
        const x2 = (-b - Math.sqrt(disc)) / (2*a);
        document.getElementById('roots').innerText = `${x1.toFixed(2)}, ${x2.toFixed(2)}`;
    }
}

function draw() {
    const w = canvas.width;
    const h = canvas.height;
    const originX = w / 2;
    const originY = h / 2;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    for (let x = originX % scale; x < w; x += scale) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
    }
    for (let y = originY % scale; y < h; y += scale) {
        ctx.moveTo(0, y); ctx.lineTo(w, y);
    }
    ctx.stroke();

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, originY); ctx.lineTo(w, originY);
    ctx.moveTo(originX, 0); ctx.lineTo(originX, h);
    ctx.stroke();

    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    let first = true;
    for (let px = 0; px < w; px++) {
        const x = (px - originX) / scale;
        const y = a*x*x + b*x + c;
        const py = originY - (y * scale);
        if (first) { ctx.moveTo(px, py); first = false; }
        else { ctx.lineTo(px, py); }
    }
    ctx.stroke();
}

function resetValues() {
    document.getElementById('slider-a').value = 1;
    document.getElementById('slider-b').value = 0;
    document.getElementById('slider-c').value = 0;
    updateValues();
}

document.getElementById('slider-a').addEventListener('input', updateValues);
document.getElementById('slider-b').addEventListener('input', updateValues);
document.getElementById('slider-c').addEventListener('input', updateValues);

updateValues();
