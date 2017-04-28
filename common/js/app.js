class snow {	
	constructor() {
		this.wWidth = window.innerWidth;
		this.wHeight = window.innerHeight;

		this.canvas = document.getElementById("snow");
		this.canvas.width = this.wWidth;
		this.canvas.height = this.wHeight;

		this.ctx = this.canvas.getContext("2d");

		this.snow = new Array();

		// 1 second 60 frames
		this.frame = 1000 / 60;

		// object count
		this.ob = 1000;
		// object down number
		this.speed = 1.5;
		this.wind = 1;
		this.maxSize = 3;

		this.color = "#fff";

		this.pushObject();
	}

	pushObject() {
		for(var i = 0; i < this.ob; i++){
			// random left and size
			const top = Math.random() * -this.wHeight;
			const left = Math.random() * this.wWidth;
			const endLeft = Math.random() * this.wWidth - left;
			const size = Math.random() * this.maxSize;
			const speed = Math.random() * this.speed + this.speed;

			// push object
			this.snow.push({ left:left , endLeft:endLeft , startTop:top , top:top , size:size , speed:speed });
		}
	}
}

class app extends snow {
	constructor() {
		super();
		this.loop = this.loop.bind(this);

		// loop functio
		setInterval(this.loop,this.frame);
	}

	loop() {
		// init
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

		// move object
		for(var j = 0; j < this.ob; j++){
			let addLeft = this.snow[j].endLeft / this.wHeight;
			this.snow[j].left += addLeft;

			this.snow[j].top += this.snow[j].speed;
			
			if(this.snow[j].top > this.wHeight){
				this.snow[j].endLeft = Math.random() * this.wWidth;
				this.snow[j].left = Math.random() * this.wWidth;
				this.snow[j].top = Math.random() * -this.wHeight;
				this.snow[j].startTop = Math.random() * -this.wHeight;
			}
			
			// draw snow
			this.ctx.beginPath();
			this.ctx.arc(this.snow[j].left, this.snow[j].top, this.snow[j].size, 0, 2 * Math.PI);
			this.ctx.fillStyle = this.color;
			this.ctx.fill();
		}
	}
}

new app();