using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Data;
using System.Data.SqlClient;

namespace tableTW
{
    public partial class KetNoiCSDL : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void Submit_Click(object sender, EventArgs e)
        {
            
           
            string connectionString = "Data Source=" + txtserver.Text + ";Initial Catalog=" + txtdatabase.Text + ";User Id=" + txtusername.Text + ";Password=" + txtpassword.Text + ";Connection Timeout=30;".Replace(@"\\", @"\");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string[] lines = { txtserver.Text, txtdatabase.Text, txtusername.Text, txtpassword.Text };
                    System.IO.File.WriteAllLines(Server.MapPath("~") + "./file.txt", lines);
                    string script = "alert(\"Thiết lập kết nối CSDL thành công!\");";
                    ScriptManager.RegisterStartupScript(this, GetType(),
                                          "ServerControlScript", script, true);
                }
                catch (SqlException)
                {
                    string script = "alert(\"Sai CSDL kiểm tra lại!\");";
                    ScriptManager.RegisterStartupScript(this, GetType(),
                                          "ServerControlScript", script, true);
                }
            }

           
        }
        protected void btn_login_Click(object sender, EventArgs e)
        {
            Response.Redirect("login.aspx");
        }

    }
}