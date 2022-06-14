$(document).ready(function () {
        var colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];

        

/* large pie/donut chart */
           
            
/* bar chart */
            var chBar = document.getElementById("chBar");
            if (chBar) {
            new Chart(chBar, {
                type: 'bar',
                data: {
                    labels: ["18", "19", "20", "21","24"],
                    datasets: [{
                        data: [3, 5, 2, 4, 2],
                        backgroundColor: colors[0]
                    },
                    {
                        data: [3, 2],
                        backgroundColor: colors[1]
                        },
                        {
                            data: [3, 4, 2, 1, 2],
                            backgroundColor: colors[2]
                        },
                        {
                            data: [4, 4, 4, 2, 3],
                            backgroundColor: colors[3]
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            barPercentage: 0.4,
                            categoryPercentage: 0.5
                        }]
                    }
                }
            });
            }

            /* 3 donut charts
            var donutOptions = {
            cutoutPercentage: 85,
                legend: {position: 'bottom', padding: 5, labels: {pointStyle: 'circle', usePointStyle: true } }
            };
 */
            // donut 1
    /*
            var chDonutData1 = {
            labels: ['Bootstrap', 'Popper', 'Other'],
                datasets: [
                    {
            backgroundColor: colors.slice(0, 3),
                        borderWidth: 0,
                        data: [74, 11, 40]
                    }
                ]
            };

            var chDonut1 = document.getElementById("chDonut1");
            if (chDonut1) {
            new Chart(chDonut1, {
                type: 'pie',
                data: chDonutData1,
                options: donutOptions
            });
            }

            // donut 2
            var chDonutData2 = {
            labels: ['Wips', 'Pops', 'Dags'],
                datasets: [
                    {
            backgroundColor: colors.slice(0, 3),
                        borderWidth: 0,
                        data: [40, 45, 30]
                    }
                ]
            };
            var chDonut2 = document.getElementById("chDonut2");
            if (chDonut2) {
            new Chart(chDonut2, {
                type: 'pie',
                data: chDonutData2,
                options: donutOptions
            });
            }

            // donut 3
            var chDonutData3 = {
            labels: ['Angular', 'React', 'Other'],
                datasets: [
                    {
            backgroundColor: colors.slice(0, 3),
                        borderWidth: 0,
                        data: [21, 45, 55, 33]
                    }
                ]
            };
            var chDonut3 = document.getElementById("chDonut3");
            if (chDonut3) {
            new Chart(chDonut3, {
                type: 'pie',
                data: chDonutData3,
                options: donutOptions
            });
            }
            */
            /* 3 line charts 
            var lineOptions = {
            legend: {display: false },
                tooltips: {interest: false, bodyFontSize: 11, titleFontSize: 11 },
                scales: {
            xAxes: [
                        {
            ticks: {
            display: false
                            },
                            gridLines: {
            display: false,
                                drawBorder: false
                            }
                        }
                    ],
                    yAxes: [{display: false }]
                },
                layout: {
            padding: {
            left: 6,
                        right: 6,
                        top: 4,
                        bottom: 6
                    }
                }
            };

            var chLine1 = document.getElementById("chLine1");
            if (chLine1) {
            new Chart(chLine1, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [
                        {
                            backgroundColor: '#ffffff',
                            borderColor: '#ffffff',
                            data: [10, 11, 4, 11, 4],
                            fill: false
                        }
                    ]
                },
                options: lineOptions
            });
            }
            var chLine2 = document.getElementById("chLine2");
            if (chLine2) {
            new Chart(chLine2, {
                type: 'line',
                data: {
                    labels: ['A', 'B', 'C', 'D', 'E'],
                    datasets: [
                        {
                            backgroundColor: '#ffffff',
                            borderColor: '#ffffff',
                            data: [4, 5, 7, 13, 12],
                            fill: false
                        }
                    ]
                },
                options: lineOptions
            });
            }

            var chLine3 = document.getElementById("chLine3");
            if (chLine3) {
            new Chart(chLine3, {
                type: 'line',
                data: {
                    labels: ['Pos', 'Neg', 'Nue', 'Other', 'Unknown'],
                    datasets: [
                        {
                            backgroundColor: '#ffffff',
                            borderColor: '#ffffff',
                            data: [13, 15, 10, 9, 14],
                            fill: false
                        }
                    ]
                },
                options: lineOptions
            });
            }*/
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    document.getElementById("tungaydaxong").value = today;
    $('#congviec_ketqua').delay(1000).fadeOut('slow');
	$(document).on("click",".back-page",function() {
		//$('#myTab a[href="#tab2"]').tab('show');
    });
    setInterval(tbAjaxcongviecdanhan, 10000); 
    setInterval(tbAjaxcongviecdaxong, 10000);
    setInterval(tbAjaxcongviecho, 10000);
    tbAjaxbaocaocongviectheongay();
    tbAjaxNhanVienMauSac();
    tbAjaxbaocaocongviec();
    tbAjaxbaocaocongviecngayhientai();
});


function tbAjaxcongviecho() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxcongviecho",
        contentType: "application/json; charset=utf-8",

        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
           
            $.each(objects, function (index, value) {
                html += '<div class="col-md-4" title="' + value["id"] + '" ">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                if (value["Qadmin"] == "True") {
                    html += '<div class="dropdown">';
                    html += '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phân công chính</button>';
                    html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
                    var id = value["id"];
                    $.each(value['listnhanvien'], function (index1, value1) {
                        html += '<div class="dropdown-item" onclick="tbAjaxPhanCongCongViec(\'' + id + '\',\'' + value1["manv"] + '\',\'' + value1["hoten"] + '\')">' + value1["hoten"] + '</div>';
                    });
                    html += '</div> </div>';
                }
                html += '<h6 class="text-danger"> <i class="fas fa-hospital-alt"></i> Công việc: ' + value["congviec"] + '</h6>';
                html += '<h6 class="text-success"> <i class="fas fa-address-card"></i> Mô tả:  ' + value["mota"] + '</h6>';
                html += '<h6 class="text-info"> <i class="fas fa-university"></i> Khoa: ' + value["tenkhoayeucau"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG tạo: ' + value["ngaygiotao"] + '</h6>';
                html += '<div class="btn btn-outline-success"  onclick="tbAjaxPhanCongCongViec(\'' + value["id"] + '\',\'' + value["manv"] + '\',\'' + value["hotennv"] + '\')">';
                html += '<i class="fas fa-check"></i>  ' + "Nhận công việc" + '</div > ';
                if (value["Qadmin"]=="True") {
                    html += '<div class="btn btn-outline-danger"  onclick="tbAjaxXoaCongViec(\'' + value["id"] + '\',\'' + value["id"] + '\')">';
                    html += '<i class="fas fa-times"></i>  ' + "Xóa công việc" + '</div > ';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#laylistcongvieccho').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-2" title="">lỗi lấy thông tin công việc</div>';
            html += '<div class="col-md-8" title="">';
            html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#laylistcongvieccho').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}

//Công việc đã nhận
function tbAjaxcongviecdanhan() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxcongviecdanhan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-4" title="' + value["id"] + '" ">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                if (value["Qadmin"] == "True") {
                    html += '<div class="dropdown">';
                    html += '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phân công công việc</button>';
                    html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
                    var id = value["id"];
                    $.each(value['listnhanvien'], function (index1, value1) {
                        html += '<div class="dropdown-item" onclick="tbAjaxPhanCongCongViec(\'' + id + '\',\'' + value1["manv"] + '\',\'' + value1["hoten"] + '\')">' + value1["hoten"] + '</div>';
                    });
                    html += '</div> </div>';
                    html += '<div class="dropdown">';
                    html += '<button class="btn login_btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phân công hỗ trợ</button>';
                    html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
                    var id = value["id"];
                    $.each(value['listnhanvien'], function (index2, value2) {
                        html += '<div class="dropdown-item" onclick="tbAjaxCapNhatNVHTCongViec(\'' + id + '\',\'' + value2["manv"] + '\',\'' + value2["hoten"] + '\')">' + value2["hoten"] + '</div>';
                    });
                    html += '</div> </div>';
                }
                html += '<h6 class="text-danger"> <i class="fas fa-hospital-alt"></i> Công việc: ' + value["congviec"] + '</h6>';
                html += '<h6 class="text-success"> <i class="fas fa-address-card"></i> Mô tả:  ' + value["mota"] + '</h6>';
                html += '<div class="btn btn-secondary" onclick="tbAjaxThemMoTaCongViec(\'' + value["id"] + '\')">';
                html += '<i class="fas fa-check"></i>  ' + "Thêm mô tả" + '</div > ';
                html += '<h6 class="text-info"> <i class="fas fa-university"></i> Khoa: ' + value["tenkhoayeucau"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG tạo: ' + value["ngaygiotao"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG nhận: ' + value["ngaygionhan"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> Nhân viên: ' + value["manv"] + ': ' + value["hotennv"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> Hỗ trợ: ' + value["nhanvienhotro"] + '</h6>';
                html += '<div class="btn btn-outline-success"onclick="tbAjaxHoanThanhCongViec(\'' + value["id"] + '\',\'' + value["id"] + '\')">';
                html += '<i class="fas fa-check"></i>  ' + "Hoàn tất" + '</div > ';
                if (value["Qadmin"] == "True") {
                    html += '<div class="btn btn-outline-primary" onclick="tbAjaxHuyNhanCongViec(\'' + value["id"] + '\')">';
                    html += '<i class="fas fa-check"></i>  ' + "Hủy nhận" + '</div > ';
                    html += '<div class="btn btn-outline-danger"  onclick="tbAjaxXoaCongViec(\'' + value["id"] + '\',\'' + value["id"] + '\')">';
                    html += '<i class="fas fa-times"></i>  ' + "Xóa" + '</div > ';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#laylistcongviecdanhan').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-8" title="">lỗi lấy thông tin công việc</div>';
            html += '<div class="col-md-2" title="">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#laylistcongviecdanhan').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}
//Công việc đã xong
function tbAjaxcongviecdaxong() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxcongviecdaxong",
        contentType: "application/json; charset=utf-8",
        data: "{ 'TUNGAYXONG' : '" + $("#tungaydaxong").val() + "','DENNGAYXONG' : '" + $("#denngaydaxong").val() + "','TIMKIEMXONG' : '" + $("#timkiemdaxong").val() + "' }",
        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            html += '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-4" title="' + value["id"] + '" ">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                if (value["Qadmin"] == "True") {
                    html += '<div class="dropdown">';
                    html += '<button class="btn login_btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Đánh giá</button>';
                    html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
                    var id = value["id"];
                    $.each(value['listxldanhgia'], function (index2, value2) {
                        html += '<div class="dropdown-item" onclick="tbAjaxDanhGiaCongViec(\'' + id + '\',\'' + value2["danhgia"] + '\')">' + value2["danhgia"] + '</div>';
                    });
                    html += '</div> </div>';
                }
                html += '<h6 class="text-danger"> <i class="fas fa-hospital-alt"></i> Công việc: ' + value["congviec"] + '</h6>';
                html += '<h6 class="text-success"> <i class="fas fa-address-card"></i> Mô tả:  ' + value["mota"] + '</h6>';
                html += '<h6 class="text-info"> <i class="fas fa-university"></i> Khoa: ' + value["tenkhoayeucau"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG tạo: ' + value["ngaygiotao"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG nhận: ' + value["ngaygionhan"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG hoàn thành: ' + value["ngaygiohoanthanh"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> Nhân viên: ' + value["manv"] + ': ' + value["hotennv"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> Đánh giá: ' + value["danhgia"] + '</h6>';
                if (value["Qadmin"] == "True") {
                    html += '<div class="btn btn-outline-primary" onclick="tbAjaxYeuCauLamLaiCongViec(\'' + value["id"] + '\')">';
                    html += '<i class="fas fa-check"></i>  ' + "Yêu cầu làm lại" + '</div > ';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#laylistcongviecdaxong').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-8" title="">lỗi lấy thông tin công việc</div>';
            html += '<div class="col-md-2" title="">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#laylistcongviecdaxong').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}
//Báo cáo công việc
function tbAjaxbaocaocongviec() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxbaocaocongviec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'tungaybaocao' : '" + $("#tungaybaocao").val() + "','denngaybaocao' : '" + $("#denngaybaocao").val() + "','timkiembaocao' : '" + $("#timkiembaocao").val() + "' }",
        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            html += '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-4" title="' + value["id"] + '" ">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                html += '<h6 class="text-danger"> <i class="fas fa-hospital-alt"></i> Mã nhân viên: ' + value["manv"] + '</h6>';
                html += '<h6 class="text-success"> <i class="fas fa-address-card"></i> Họ tên:  ' + value["hotennv"] + '</h6>';
                html += '<h6 class="text-info"> <i class="fas fa-university"></i> Số công việc: ' + value["socongviec"] + '</h6>';
               // html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG trung bình (phút): ' + value["trungbinhphut"] + '</h6>';
               // html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG lâu nhất (phút): ' + value["caonhatphut"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> Công việc tiêu biểu: ' + value["lydo"] + '</h6>';
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#laybaocaocongviec').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-2" title="">lỗi lấy thông tin công việc</div>';
            html += '<div class="col-md-8" title="">';
            html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#laybaocaocongviec').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}


//-------------------------
function tbAjaxXoaCongViec(ID,TEN) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxXoaCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','TEN' : '" + TEN +"' }",
        dataType: "json",
        success: function (data) {
            console.log(data);  
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
            html += '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">'+ value["ketqua"] +'</h6>';
                html += '</div>'  
            });
            //$('#msg').html(data).fadeIn('slow');
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không xóa được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

function tbAjaxHuyNhanCongViec(ID) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxHuyNhanCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "'}",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10" title="">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không xóa được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

function tbAjaxHoanThanhCongViec(ID, MANV) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxHoanThanhCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','MANV' : '" + MANV + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không hoàn thành được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}


function tbAjaxPhanCongCongViec(ID,MANV,HOTEN) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxPhanCongCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','MANV' : '" + MANV + "','HOTEN' : '" + HOTEN + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không phân công được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

function tbAjaxCapNhatNVHTCongViec(ID, MANV, HOTEN) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxCapNhatNVHTCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','MANV' : '" + MANV + "','HOTEN' : '" + HOTEN + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không phân công được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

// Yêu cầu làm lại
function tbAjaxYeuCauLamLaiCongViec(ID) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxYeuCauLamLaiCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "'}",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10" title="">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            //$('#msg').html(data).fadeIn('slow');
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không yêu cầu làm lại được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

//Đánh giá công việc
function tbAjaxDanhGiaCongViec(ID,DANHGIA ) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxDanhGiaCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','DANHGIA' : '" + DANHGIA + "'}",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không đánh giá được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

//Thêm mô tả
function tbAjaxThemMoTaCongViec(ID) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxThemMoTaCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','MOTA' : '" + $("#txtthemmota").val()  + "'}",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
            document.getElementById("txtthemmota").value = "";
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không đánh giá được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}
// Biểu đồ đường
function tbAjaxbaocaocongviectheongay() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxbaocaocongviectheongay",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var dataline = [];
            var label = [];
            /* large line chart */
            
            $.each(objects, function (index, value) {
                label.push(value["ngay"]);
                dataline.push(value["soluong"])
            });
            var chLine = document.getElementById("chLine");
            var chartData = {
                labels: label,
                datasets: [{
                    data: dataline,
                    backgroundColor: 'transparent',
                    borderColor: 'orange',
                    borderWidth: 4,
                    pointBackgroundColor: '#007bff'
                }
                    //   {
                    //     data: [639, 465, 493, 478, 589, 632, 674],
                    //     backgroundColor: colors[3],
                    //     borderColor: colors[1],
                    //     borderWidth: 4,
                    //     pointBackgroundColor: colors[1]
                    //   }
                ]
            };
            if (chLine) {
                new Chart(chLine, {
                    type: 'line',
                    data: chartData,
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            display: false
                        },
                        responsive: true
                    }
                });
            }
            //$('#laylistcongviecdanhan').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-8" title="">lỗi lấy báo cáo công việc theo ngày</div>';
            html += '<div class="col-md-2" title="">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}
// Biểu đồ bánh
function tbAjaxbaocaocongviecngayhientai() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxbaocaocongviecngayhientai",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var dataline = [];
            var label = [];
            var mau = [];
            var ngaytr = '';
            /* large line chart */

            $.each(objects, function (index, value) {
                label.push(value["hotennv"]);
                dataline.push(value["soluong"]);
                mau.push(value["mausac"]);
                ngaytr = value["ngay"];
            });
            var chPie = document.getElementById("chPie");
            if (chPie) {
                new Chart(chPie, {
                    type: 'pie',
                    data: {
                        labels: label,
                        datasets: [
                            {
                                backgroundColor: mau,
                                borderWidth: 0,
                                data: dataline
                            }
                        ]
                    },
                    plugins: [{
                        beforeDraw: function (chart) {
                            var width = chart.chart.width,
                                height = chart.chart.height,
                                ctx = chart.chart.ctx;
                            ctx.restore();
                            var fontSize = (height / 110).toFixed(2);
                            ctx.font = fontSize + "em sans-serif";
                            ctx.colors = "#512da8";
                            ctx.backgroundColor = "white";
                            ctx.textBaseline = "middle";;
                            var text = ngaytr,
                                textX = Math.round((width - ctx.measureText(text).width) / 2),
                                textY = height / 2;
                            ctx.fillText(text, textX, textY);
                            ctx.save();
                        }
                    }],
                    options: { layout: { padding: 0 }, legend: { display: false }, cutoutPercentage: 80 }
                });
            }
            //$('#laylistcongviecdanhan').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-8" title="">lỗi lấy báo cáo công việc theo ngày</div>';
            html += '<div class="col-md-2" title="">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}
//Nhân viên màu sắc
function tbAjaxNhanVienMauSac() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxNhanVienMauSac",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            html += '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-3" title="' + value["manv"] + '" ">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                html += '<h6 class="text-white"> <i class="fas fa-square" style="color:' + value["mausac"]+';"></i> ' + value["hoten"] + '</h6>';
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#laylistnhanvienmausac').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-2" title="">lỗi lấy thông tin nhân viên</div>';
            html += '<div class="col-md-8" title="">';
            html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#laylistnhanvienmausac').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}
