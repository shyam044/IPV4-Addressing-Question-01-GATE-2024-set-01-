let t1=document.getElementById("time1");
let count=0;
let timetaken1 = setInterval(function()
{
    count+=1
    if(count<60)
    {
        t1.textContent="Time : "+ count + " sec"
    }
    else if(count>=60 && count<3600)
    {
        let minutes  = Math.floor(count/60);
        let seconds = count - minutes*60;
        t1.textContent="Time : "+ minutes + " min " + seconds + " sec ";
    }
    else if(count>=3600 && count<3600*24)
    {
        let hours = Math.floor(count/3600);
        let ms=count%3600
        let minutes  = Math.floor(ms/60);
        let seconds = ms%60;
        t1.textContent="Time : "+ hours + " hr " + minutes + " min " + seconds + " sec ";
    }
    t1.style.color="red";
},1000)
let q1o1=document.getElementById("q1opt1");
let sub1=document.getElementById("submit1");
let ans1=document.getElementById("answer1");
ans1.classList.add("d-none");
let par1=document.getElementById("paragraph1");
par1.classList.add("d-none");
sub1.onclick = function()
{
    if(q1o1.value == 6)
    {
        document.getElementById("cw1").textContent="\u2713Correct";
        document.getElementById("cw1").style.color="green";
        document.getElementById("cw1").style.textAlign="center";
    }
    else if(q1o1.value == "" )
    {
        alert("select the option before submitting");
        return 0;
    }
    else 
    {
        document.getElementById("cw1").textContent="\u2717Wrong";
        document.getElementById("cw1").style.color="red";
        document.getElementById("cw1").style.textAlign="center";
    }
    document.getElementById("tt1").textContent="you took "+ t1.textContent +"  to solve this question";
    ans1.classList.remove("d-none");
    clearInterval(timetaken1);
}
ans1.onclick=function()
{
    par1.classList.remove("d-none");
}