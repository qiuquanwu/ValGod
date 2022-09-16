
export function JSONToExcelConvertor (JSONData, FileName, title, keys, notital, titleH) {
  if (!JSONData) { return }
    // 转化json为object
  var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData

  var excel = '<table>'

    // 设置表头
  var row = notital ? '' : "<tr><th  style='border: 1px solid #000000;height:36px;line-height:36px;' align='center' colspan='" + title.length + "'>" + (titleH || '卷内文件目录') + '</th></tr><tr>'

  if (title) {
        // 使用标题项
    for (var i in title) {
      row += "<th  style='border: 1px solid #000000;height:36px;line-height:36px;' align='center'>" + title[i] + '</th>'
    }
  } else {
        // 不使用标题项
    for (var i in arrData[0]) {
      row += "<th  style='border: 1px solid #000000;height:36px;line-height:36px;' align='center'>" + i + '</th>'
    }
  }

  excel += row + '</tr>'

    // 设置数据
  for (var i = 0; i < arrData.length; i++) {
    var row = '<tr>'
    for (var k in title) {
      if (!keys[k]) {
        row += "<td style='border: 1px solid #000000;height:36px;line-height:36px;MSO-NUMBER-FORMAT:\"\@\"'></td>"
      } else {
        row += "<td  style='border: 1px solid #000000;height:36px;line-height:36px;MSO-NUMBER-FORMAT:\"\@\"' align='center'>" + arrData[i][keys[k]] + '</td>'
      }
    }
        // for (var index in arrData[i]) {
        //     //判断是否有过滤行
        //     if(filter)
        //     {
        //         if(filter.indexOf(index)==-1)
        //         {
        //              var value = arrData[i][index] == null ? "" : arrData[i][index];
        //              row += '<td>' + value + '</td>';
        //         }
        //     }
        //     else
        //     {
        //          var value = arrData[i][index] == null ? "" : arrData[i][index];
        //          row += "<td align='center'>" + value + "</td>";
        //     }
        // }
    excel += row + '</tr>'
  }

  excel += '</table>'

  var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>"
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
  excelFile += '<head>'
  excelFile += '<!--[if gte mso 9]>'
  excelFile += '<xml>'
  excelFile += '<x:ExcelWorkbook>'
  excelFile += '<x:ExcelWorksheets>'
  excelFile += '<x:ExcelWorksheet>'
  excelFile += '<x:Name>'
  excelFile += '{worksheet}'
  excelFile += '</x:Name>'
  excelFile += '<x:WorksheetOptions>'
  excelFile += '<x:DisplayGridlines/>'
  excelFile += '</x:WorksheetOptions>'
  excelFile += '</x:ExcelWorksheet>'
  excelFile += '</x:ExcelWorksheets>'
  excelFile += '</x:ExcelWorkbook>'
  excelFile += '</xml>'
  excelFile += '<![endif]-->'
  excelFile += '</head>'
  excelFile += '<body>'
  excelFile += excel
  excelFile += '</body>'
  excelFile += '</html>'

  var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile)

  var link = document.createElement('a')
  link.href = uri

  link.style = 'visibility:hidden'
  link.download = FileName + '.xls'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
