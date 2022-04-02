const canvas = document.getElementById('jsCanvas');
const colors = document.getElementsByClassName('controls__color');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave')
const ctx = canvas.getContext('2d');

const INITIAL_COLOR = '#2c2c2c' // 초기 페인트 색상

const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0 ,0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;    //초기 페인트 굵기

let painting = false;
let filling = false;


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

const handleColorClick = (e) => {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

const handleRangeChange = (e) => {
    const size = e.target.value;
    ctx.lineWidth = size;
}

const handleModeClick = (e) => {
    if(filling === true){
        filling = false;
        mode.innerText = 'Fill'
    }else{
        filling = true;
        mode.innerText = 'PAINT'
    }
}

const handleCanvasClick = () => {
    if(filling){
        // 아래의 코드만 있으면 캔버스를 클릭할 때마다 캔버스를 전체 색으로 채워버린다.
        // 다른 클릭 이벤트인 페인트로 바꿔도 이곳의 이벤트리스너가 적용된다는 의미이다.
        ctx.fillRect(0 ,0, canvas.width, canvas.height);
    }
}

const handleCM = (e) => {
    // 브라우저의 기본동작을 막는다.
    // 마우스 우클릭도 막는다. 즉, 우클릭으로 이미지를 다운받게 하고 싶지 않다.
    // 오직 save 버튼으로만 다운받게 하고 싶기에 활용
    e.preventDefault();
}

const handleSaveClick = () => {
    // 첫번째로는 이미지를 선택할 수 있어야 한다.
    const image = canvas.toDataURL('image/jpeg');
    // 두번째로 이미지를 다운로드할 수 있는 태그가 필요하다.
    const link = document.createElement('a')
    // 세번째로 이미지는 url로 되어있으니 하이퍼택스트를 넘길 수 있어야 한다.
    link.href = image;
    // 이미지의 저장 이름 설정
    link.download = 'PaintJS[🖌️]';
    link.click();
}


if(canvas){
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    // 캔버스 화면 밖으로 커서가 빠져 나가도 painting을 멈춰야한다.
    // 그래야 다시 캔버스 화면으로 돌아왔을때 클릭하지 않아도 그려지는 현상을 막을 수 있다.
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('click', handleCanvasClick)
    canvas.addEventListener('contextmenu', handleCM)
}

// color의 경우 배열이기에 배열 메소드를 쓰면 확인이 가능해서 인듯하다.
Array.from(colors).forEach(color => 
    color.addEventListener('click', handleColorClick)
)

// 항상 이렇게 조건식을 세워두는 게 중요하다고 한다..
// 아마도 document에서 변수를 바로 쓰는 것이라 에러가 발생했을 때 확인하려는 위치인듯하다.
if(range){
    range.addEventListener('input', handleRangeChange)
}

if(mode){
    mode.addEventListener('click', handleModeClick)
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick)
}