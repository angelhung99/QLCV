<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="indexQLCV.aspx.cs" Inherits="tableTW.indexQLCV" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
          <title>Quản lý công việc phòng CNTT</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="server">    
    <div class="container-fluid">
        <div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a><asp:Button ID="Submit"  CssClass="login_btn"  runat="server" onclick="logout_Click" Text="Đăng xuất"/></a>
  <a><asp:Button ID="congviec_tennv_bt" CssClass="login_btn"  runat="server" Text="" />    </a>
<ul class="nav flex-column nav-tabs tab-service" id="myTab" role="tablist">
                        <li class="nav-item" >
                            <a class="nav-link active"  id="tab-1" data-toggle="tab" href="#tab1" role="tab" aria-controls="themcongviec" aria-selected="true">Thêm công việc</a>
                        </li>
						 <li class="nav-item">
                            <a class="nav-link" id="tab-20" data-toggle="tab" href="#tab20" role="tab" aria-controls="themnhanvien" aria-selected="false">Thêm nhân viên</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="tab-2" data-toggle="tab" href="#tab2" role="tab" aria-controls="listcongvieccho" aria-selected="false">Công việc chưa nhận</a>
                        </li>
                           <li class="nav-item"">
                            <a class="nav-link" id="tab-3" data-toggle="tab" href="#tab3" role="tab" aria-controls="listcongviecdanhan" aria-selected="false">Công việc đang làm</a>
                        </li>
                         <li class="nav-item"">
                            <a class="nav-link" id="tab-4" data-toggle="tab" href="#tab4" role="tab" aria-controls="listcongviecdaxong" aria-selected="false">Công việc đã xong</a>
                        </li>
                          <li class="nav-item"">
                            <a class="nav-link" id="tab-5" data-toggle="tab" href="#tab5" role="tab" aria-controls="listbaocaocongviec" aria-selected="false">Báo cáo công việc</a>
                        </li>
                         <li class="nav-item"">
                            <a class="nav-link" id="tab-7" data-toggle="tab" href="#tab7" role="tab" aria-controls="listbaocaocongviec_ngay" aria-selected="false">Báo cáo biểu đồ</a>
                        </li>
                    </ul>
   
</div>


 <div class="upper">
      <!-- <div class="btn btn-light"> <label for="nhapvien_lblmabn"  runat="server" id="congviec_manv" class="text-white"></label>
        <label for="nhapvien_lblmabn"  runat="server" id="congviec_tennv" class="text-white"></label>
       </div>-->
     <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; Menu</span>
         <div class="btn btn-light align-items-center"  id="congviec_ketqua"></div>
       </div>
        <div id="main">
            <div class="row mt-5 mb-5">
                
                <div class="col-md-12 qlcvmain">
          
                    
                    <div class="tab-content shadow" id="tabContent">

                        <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="themcongviec-tab">
                           <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6" >
                   
                            <div class="form-group">
                                <label for="nhapvien_lblmabn" class="text-white">Tên công việc:</label><br/>
                                <asp:TextBox ID="themcongviec_txttencongviec"  class="form-control" runat="server"></asp:TextBox>
                                 <label for="nhapvien_lblmabn" class="text-white">Mô tả công việc:</label><br/>
                                <asp:TextBox ID="themcongviec_txtmotacongviec"  class="form-control" runat="server"></asp:TextBox>
                                 <label for="nhapvien_lblmabn" class="text-white">Khoa yêu cầu:</label><br/>
                                <asp:TextBox ID="themcongviec_txtkhoayccongviec"  class="form-control" runat="server"></asp:TextBox>
                                  <label for="nhapvien_lblmabn" class="text-white">Nhân viên chính:</label><br/>
                                <asp:DropDownList Class="form-control" ID="themcongviec_dlphancongcongviec"  runat="server" AutoPostBack="True" OnSelectedIndexChanged="themcongviec_dlphancongcongviec_Change"></asp:DropDownList>
                             <asp:HiddenField ID="hdfphancongcongviec" runat="server" />
                                <label for="nhapvien_lblmabn" class="text-white">Nhân viên hỗ trợ:</label><br/>
                                <asp:DropDownList Class="form-control" ID="themcongviec_dlnhanvienhotro"  runat="server" AutoPostBack="True" OnSelectedIndexChanged="themcongviec_dlnhanvienhotro_Change"></asp:DropDownList>
                             <asp:TextBox ID="themcongviec_txtnhanvienhotro" ReadOnly="true"  class="form-control" runat="server"></asp:TextBox>
                               
                                <label for="nhapvien_lblmabn" class="text-white">Thời gian yêu cầu hoàn thành:</label><br/>
                                 <div class="col-md-12 row">
                                     <div class="col-md-6">
                                <asp:TextBox ID="themcongviec_txtthoigianyeucau" Visible="false" textmode="DateTimeLocal" class="form-control" runat="server"></asp:TextBox>
                               <asp:TextBox ID="themcongviec_txtngayyeucau" textmode="Date" format="dd/MM/yyyy" class="form-control" runat="server"></asp:TextBox>
                                </div>
                                     <div class="col-md-6">
                                         <asp:TextBox ID="themcongviec_txtgioyeucau" textmode="Time" format="HH:mm" class="form-control" runat="server"></asp:TextBox>
                            </div>
                            </div>
                                     </div>    
                            <div class="form-group">
 <asp:Button ID="themcongviec_btnluu"  onclick="themcongviec_btnluu_Click"  class="btn login_btn btn-md" runat="server"  Text="Thêm mới" />
<asp:Button ID="themcongviec_nhaplai"  onclick="xoatxt_Click" class="btn login_btn btn-md" runat="server"  Text="Nhập lại" />
                            </div>

                </div>
            </div>
                        </div>
						<div class="tab-pane fade" id="tab20" role="tabpanel" aria-labelledby="themnhanvien-tab">
                           <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                            <h3 class="text-center text-white">Nhân viên</h3>
                   
                            <div class="form-group">
                                <label for="nhapvien_lblmabn" class="text-white">Chọn nhân viên để chỉnh sửa</label><br/>
                                <asp:DropDownList Class="form-control" ID="themnhanvien_dlnhanvien"  runat="server" AutoPostBack="True" OnSelectedIndexChanged="themnhanvien_dlnhanvien_Change"></asp:DropDownList>
                                <label for="nhapvien_lblmabn" class="text-white">Tên nhân viên:</label><br/>
                                <asp:TextBox ID="themnhanvien_txttennhanvien"  class="form-control" runat="server"></asp:TextBox>
                                 <label for="nhapvien_lblmabn" class="text-white">Mã nhân viên:</label><br/>
                                <asp:TextBox ID="themnhanvien_txtmanhanvien"  class="form-control" runat="server"></asp:TextBox>
                                 <label for="nhapvien_lblmabn" class="text-white">Mật khẩu:</label><br/>
                                <asp:TextBox ID="themnhanvien_txtmatkhau"  class="form-control" runat="server"></asp:TextBox>
                                <asp:CheckBox Class="form-control" ID="themnhanvien_checkQadmin" Text="Quyền quản lý" runat="server"></asp:CheckBox>
                  
                            </div>
                            <div class="form-group">
 <asp:Button ID="themnhanvien_btnluu"  onclick="themnhanvien_btnluu_Click"  class="btn login_btn btn-md" runat="server"  Text="Thêm mới" />
                                 <asp:Button ID="themnhanvien_btncapnhat"  onclick="themnhanvien_btncapnhat_Click"  class="btn login_btn btn-md" runat="server"  Text="Cập nhật" />
                                 <asp:Button ID="themnhanvien_btnxoa"  onclick="themnhanvien_btnxoa_Click"  class="btn login_btn btn-md" runat="server"  Text="Xóa" />
<asp:Button ID="themnhanvien_nhaplai"  onclick="xoatxt_Click" class="btn login_btn btn-md" runat="server"  Text="Nhập lại" />
                            </div>

                </div>
            </div>
                        </div>
               <div class="tab-pane fade" id="tab2" role="tab" aria-labelledby="listcongvieccho-tab">
                            <div class="tab-service-title">
                                <div class="tab-service-date"></div>
                                <div class="reload-btn text-center">
                                    
                                </div>
                                <div class="back-btn text-center">
                                    
                                </div>
                            </div>
                            <main role="main">
                                <div class="album py-5">
                                    <div class="container">
                                        <div id="laylistcongvieccho" class="row">
                                            
                                        </div>
                                    </div>
                                </div>
                            </main>
             
                        </div>
                     <div class="tab-pane fade" id="tab3" role="tab" aria-labelledby="listcongviecdanhan-tab">
                            <div class="tab-service-title">
                                <div class="tab-service-date"></div>
                                <div class="reload-btn text-center">
                                    
                                </div>
                                <div class="back-btn text-center">
                                    
                                </div>
                            </div>
                            <main role="main">
                                <div class="album py-5">
                                    <div class="container">
                                        <div id="themmotacongviecdanhan" class="row col-md-12">
                                            <div class="col-md-2">
                                            <label for="nhapvien_lblmabn" class="text-white">Thêm mô tả:</label><br/>
                                            </div>
                                             <div class="col-md-10">
                                         <input type="text" id="txtthemmota" name="txtthemmota" class="form-control">
                                             </div>

                                        </div>
                                            </br>  
                                        <div id="laylistcongviecdanhan" class="row">
                                            
                                        </div>
                                    </div>
                                </div>
                            </main>
             
                        </div>
                         <div class="tab-pane fade" id="tab4" role="tab" aria-labelledby="listcongviecdaxong-tab">
                            <div class="tab-service-title">
                                <div class="tab-service-date"></div>
                                <div class="reload-btn text-center">
                                    
                                </div>
                                <div class="back-btn text-center">
                                    
                                </div>
                            </div>
                            <main role="main">
                                <div class="album py-5">
                                    <div class="container">
                                        <div id="timkiemcongviecdaxong" class="row col-md-12">
                                            <div class="col-md-1">
                                            <label for="nhapvien_lblmabn" class="text-white">Từ:</label><br/>
                                            </div>
                                             <div class="col-md-3">
                                         <input type="date" id="tungaydaxong" name="tungaydaxong" class="form-control">
                                             </div>
                                          <div class="col-md-1">
                                             <label for="nhapvien_lblmabn" class="text-white">Đến:</label><br/>
                                             </div>
                                            <div class="col-md-3">
                                        <input type="date" id="denngaydaxong"  name="denngaydaxong"   class="form-control">
                                        </div>
                                            <div class="col-md-2">
                                             <label for="nhapvien_lblmabn" class="text-white">Tìm kiếm:</label><br/>
                                             </div>
                                         <div class="col-md-2">
                                        <input type="text" id="timkiemdaxong"  name="timkiemdaxong" class="form-control">
                                        </div>
                                               </div>
                                        </br>
                                        <div id="laylistcongviecdaxong" class="row">
                                            
                                        </div>
                                    </div>
                                </div>
                            </main>
             
                        </div>
                         <!-- Tab5   -->
                        <div class="tab-pane fade" id="tab5" role="tab" aria-labelledby="baocaocongviec-tab">
                            <div class="tab-service-title">
                                <div class="tab-service-date"></div>
                                <div class="reload-btn text-center">
                                    
                                </div>
                                <div class="back-btn text-center">
                                    
                                </div>
                            </div>
                            <main role="main">
                                <div class="album py-5">
                                    <div class="container">
                                        <div id="timkiembaocaocongviec" class="row col-md-12">
                                            <div class="col-md-1">
                                            <label for="nhapvien_lblmabn" class="text-white">Từ:</label><br/>
                                            </div>
                                             <div class="col-md-3">
                                         <input type="date" id="tungaybaocao" name="tungaydaxong" class="form-control">
                                             </div>
                                          <div class="col-md-1">
                                             <label for="nhapvien_lblmabn" class="text-white">Đến:</label><br/>
                                             </div>
                                            <div class="col-md-3">
                                        <input type="date" id="denngaybaocao"  name="denngaydaxong" class="form-control">
                                        </div>
                                            <div class="col-md-2">
                                             <label for="nhapvien_lblmabn" class="text-white">Tìm kiếm:</label><br/>
                                             </div>
                                         <div class="col-md-2">
                                        <input type="text" id="timkiembaocao"  name="timkiemdaxong" class="form-control">
                                        </div>
                                               </div>
                                        </br>
                                        <div id="laybaocaocongviec" class="row">
                                            
                                        </div>
                                         <asp:Button ID="printButton" runat="server" class="btn login_btn btn-md" Text="In Phiếu" OnClientClick="javascript:window.print();" />
                                    </div>
                                </div>
                            </main>
             
                        </div>
                        <!-- Hết   -->
                         <!-- Tab7   -->
                        <div class="tab-pane fade" id="tab7" role="tab" aria-labelledby="baocaocongviec_ngay-tab">
                            <div class="tab-service-title">
                                <div class="tab-service-date"></div>
                                <div class="reload-btn text-center">
                                    
                                </div>
                                <div class="back-btn text-center">
                                    
                                </div>
                            </div>
                            <main role="main">
                                <div class="album py-5">
                                    <div class="container">
                                        

                                        <div id="laybaocaocongviec_ngay" class="row">
    <div class="my-3 row">
        <div class="col">
        </div>
    </div>
    <div class="row my-2">
        <div class="col-md-6 py-1" style="padding-left: 0px;padding-right: 0px;">
            <div class="card">
                <div class="card-body">
                    <canvas id="chLine"></canvas>
                </div>
            </div>
        </div>
         <div class="col-md-6 py-1" style="padding-left: 0px;padding-right: 0px;">
            <div class="card">
                <div class="card-body">
                    <canvas id="chPie"></canvas>
                </div>
            </div>
        </div>
    </div>                                      
  <!--  <div class="row py-2">
         <div class="col-md-4 py-1" style="padding-left: 0px;padding-right: 0px;">
            <div class="card">
                <div class="card-body">
                    <canvas id="chBar"></canvas>
                </div>
            </div>
        </div>
        <div class="col-md-4 py-1" style="padding-left: 0px;padding-right: 0px;">
            <div class="card">
                <div class="card-body">
                    <canvas id="chDonut2"></canvas>
                </div>
            </div>
        </div>
         <div class="col-md-4 py-1" style="padding-left: 0px;padding-right: 0px;">
            <div class="card">
                <div class="card-body">
                    <canvas id="chDonut3"></canvas>
                </div>
            </div>
        </div>
    </div> -->
                                              <div id="laylistnhanvienmausac" class="row">
                                            
                                        </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </main>
             
                        </div>
                        <!-- Hết   -->
                    </div>
                </div>
            </div>
            </div>
        
    <script>
        function openNav() {
            document.getElementById("mySidenav").style.width = "300px";
            document.getElementById("main").style.marginLeft = "300px";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }
    </script>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="js/custom2.js"></script>
    </asp:Content>