document.addEventListener("DOMContentLoaded", () =>{
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const Clear = document.querySelector(".Clear");
    const BrushSize = document.querySelector(".Size");
    const Submit = document.querySelector(".submit");
    const Value = document.querySelector(".Value");
    const Colors = document.querySelectorAll("button");
    const Head = document.querySelector(".head");
    let mouse = { x: 0, y: 0 };

    const  onPaint = ()=> {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    };
    
    function watchColorPicker(event)
    {
        let colorType = event.target.value
        ctx.strokeStyle = colorType;
    };
    SelectButtonColor(Colors, ctx);

    function Brush(ctx){
        let Size = ControlBrushSize(BrushSize);
        Value.textContent = Size;
        ctx.lineWidth = Size;
        ctx.lineJoin = 'round';
    };

    function SelectButtonColor (Colors, ctx) {
        Colors.forEach(item =>
        {
            item.addEventListener("click", () =>
            {
                ctx.strokeStyle = item.value;
            });
        });
    }

    function ControlBrushSize(BrushSize){
        let Size = BrushSize.value;
        Size > 50 ? Size = 50 : Size;
        Size < 1 ? Size = 1 : Size;
        return Size;
    }

    function MouseDownControl(ctx, mouse, canvas, onPaint){
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        canvas.addEventListener('mousemove', onPaint);
    }



    Head.addEventListener("change", watchColorPicker, false);

    Submit.addEventListener("click", () =>{
        Brush(ctx);
        BrushSize.value = "";
    })

    Clear.addEventListener("click", () =>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    canvas.addEventListener('mousemove', function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    });

    canvas.addEventListener('mouseup', ()=> {
        canvas.removeEventListener('mousemove', onPaint);
    });

    canvas.addEventListener('mousedown', ()=> {
        MouseDownControl(ctx, mouse, canvas, onPaint);
    });

    localStorage.setItem("image", canvas.toDataURL());
})
