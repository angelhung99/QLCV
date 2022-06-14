<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="KetNoiCSDL.aspx.cs" Inherits="tableTW.KetNoiCSDL" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="server">
     <div>
        <h1 class="text-center pt-5">Quản lý công việc</h1>
        <div class="container">
            <div  class="row justify-content-center align-items-center">
                    <div class="col-md-12">
                            <div class="form-group">
                                <label for="username" class="text-info">Server:</label><br/>
                                <asp:TextBox ID="txtserver"  class="form-control" runat="server"></asp:TextBox>
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Database:</label><br/>
                                <asp:TextBox ID="txtdatabase" class="form-control" runat="server"></asp:TextBox>
                            </div>
                        <div class="form-group">
                                <label for="password" class="text-info">username:</label><br/>
                                <asp:TextBox ID="txtusername" class="form-control" runat="server"></asp:TextBox>
                            </div>
                        <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br/>
                                <asp:TextBox ID="txtpassword" class="form-control" runat="server" TextMode="Password"></asp:TextBox>
                            </div>
                            <div class="form-group">
 <asp:Button ID="Submit"  class="btn btn-info btn-md" runat="server" onclick="Submit_Click" Text="Lưu" />
 <asp:Button ID="btn_login"  class="btn btn-info btn-md" runat="server" onclick="btn_login_Click" Text="Trở về" />

                            </div>
                    </div>
            </div>
        </div>
    </div>
</asp:Content>
