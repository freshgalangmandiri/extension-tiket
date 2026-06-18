function qs(a) {
	return document.querySelector(a);
}
function qsa(a) {
	return document.querySelectorAll(a);
}
HTMLElement.prototype.qs = function (a) {
	return this.querySelector(a);
}
HTMLElement.prototype.qsa = function (a) {
	return this.querySelectorAll(a);
};
//============ Format Tanggal
String.prototype.tanggal = function (a = "tgl") {
	var bulan = ["-", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
	// var tanggal = this.substring(6, 8) + " " + bulan[this.substring(4, 6) * 1] + " " + this.substring(2, 4);
	var tanggal = this.substring(6, 8) + " " + bulan[parseInt(this.substring(4, 6)) * 1] + " " + this.substring(2, 4);
	var jam = this.substring(8, 10) + ":" + this.substring(10, 12);
	if (a == "tgl") { x = tanggal; }
	else if (a == "num") {
		var spl = this.replace(/(-|,|\.)/g, "").split(" ");
		var jam = ""; if (spl.length > 3) var jam = spl[3].replace(/:/g, "");
		var th = spl[2];

		if (th?.length == 2) th = "20" + th;
		x = th + spl[1].bulan() + spl[0].sepuluh() + jam;
	}
	else if (a == "jam") { x = jam; }
	//else if(a=="hari"){ x=this.substring(0,4)+","+this.substring(4,
	else if (a == "hari") { x = hari[new Date(this.substring(0, 4) + "," + this.substring(4, 6) + "," + this.substring(6, 8)).getDay()]; }
	else if (a == "jamTgl") { x = jam + ", " + tanggal; }
	else if (a == "tglJam") { x = tanggal + ", " + jam; }
	return x;
}
//============ Format harga
String.prototype.rupiah = function () {
	var y = this;
	var x = "";
	var n = 0;
	for (var z = (y.length - 1); z > -1; z--) {
		var ttk = "";
		if (n == 3) { var ttk = "."; var n = 0; }
		x = y[z] + ttk + x;

		n++;
	}
	return x;
}
//==== Bulan ========
String.prototype.bulan = function () {
	let a = this.toLowerCase().substring(0, 3);
	if (a == "agt") a = "aug";
	let bl1 = ["-", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	let bl2 = ["-", "jan", "feb", "mar", "apr", "mei", "jun", "jul", "agu", "sep", "okt", "nop", "des"];
	let bla = $.inArray(a, bl1);
	let blb = $.inArray(a, bl2);
	let bl = bla;
	if (bl == -1) { bl = blb; }
	if (bl == -1) { bl = 0; }

	if (bl < 10) { bl = "0" + bl; }
	return bl;
}
//==== Tahun ========
String.prototype.tahun = function () {
	var d = new Date();
	var th = d.getFullYear();
	if ((d.getMonth() + 1) > parseInt(this.trim().toLowerCase().substring(0, 3).bulan())) th++;
	return th;
}
//==== Tanggal Jam Lebih dari 10========
String.prototype.sepuluh = function () {
	var x = parseInt(this) * 1;
	if (x < 10) { x = "0" + x; }
	return x;
}
//==== Tanggal Jam Lebih dari 10========
String.prototype.jam = function () {
	var tik = this.split(".");
	if (this.indexOf(".") == -1) { var tik = this.split(":"); }
	x = tik[0].sepuluh() + "" + tik[1].sepuluh();
	return x;
}
//==== Untuk Pemisah Pertama tidak ada========
function batas(a, b, c) {
	x = "";
	if (a > b) { x = c; }
	return x;
}
//==== Kapital
String.prototype.kapital = function () {
	var txt = this.toLowerCase().split(" ");
	var tx = "";
	var x;
	for (x in txt) {
		tx += txt[x].charAt(0).toUpperCase() + txt[x].slice(1) + " ";
	}
	return tx.trim();
}
function ck(a) {
	if (a.indexOf("=") > -1) { document.cookie = a; }
	else {
		var hs = 0;
		var dc = document.cookie.split(";");
		for (var z = 0; z < dc.length; z++) {
			var ck = dc[z].split("=");
			if (ck[0].trim() == a) hs = ck[1];
		}
		return hs;
	}
}
/*chrome.runtime.sendMessage({
	from:    'content',
	subject: 'showPageAction'
});*/

url = document.URL.toLowerCase();
function cek(a) {
	var hsl = 0;
	if (url.indexOf(a) > -1) var hsl = 1;
	return hsl;
}
