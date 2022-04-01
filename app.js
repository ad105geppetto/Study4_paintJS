const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = '#2c2c2c';    // 초기 페인트 색상
ctx.lineWidth = 2.5;    //초기 페인트 굵기

let painting = false;


const onMouseLeave = () => {
    painting = false;
}

const onMouseMove = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        // painting이 false가 되는 순간 그 위치에서 선을 긋는다.
        // 즉, 클릭하는 순간 그림 그리기 시작!!
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

const onMouseDown = () => {
    painting = true;
}

const onMouseUp = () => {
    // painting 변수를 false로 바꾸는 것을 할당하는 것보다
    // 함수로 작성하는게 더 좋다고 한다... 아마도 리펙토링과 클린코드의 개념인듯한데
    // 공부해봐야 알듯
    // painting = false;
    onMouseLeave()
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    // 캔버스 화면 밖으로 커서가 빠져 나가도 painting을 멈춰야한다.
    // 그래야 다시 캔버스 화면으로 돌아왔을때 클릭하지 않아도 그려지는 현상을 막을 수 있다.
    canvas.addEventListener('mouseleave', onMouseLeave)
}