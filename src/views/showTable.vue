<template>
  <div class="tablebox" style="border: 1px solid #000">
    <table id="tableId" border="0" cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                <th>排名</th>
                <th>地市</th>
                <th>纯枪量(吨)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>大连</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>2</td>
                <td>大连2</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>3</td>
                <td>大连3</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>4</td>
                <td>大连4</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>5</td>
                <td>大连5</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>6</td>
                <td>大连6</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>7</td>
                <td>大连7</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>8</td>
                <td>大连8</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>9</td>
                <td>大连9</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>10</td>
                <td>大连10</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>11</td>
                <td>大连11</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>12</td>
                <td>大连12</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>13</td>
                <td>大连13</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>14</td>
                <td>大连14</td>
                <td>2470.48</td>
            </tr>
            <tr>
                <td>15</td>
                <td>大连15</td>
                <td>2470.48</td>
            </tr>
    </tbody>
  </table>
</div>
</template>
<script>
export default {
  name: 'tablebox',
  data() {
    return {
      MyMarhq:""
    }
  },
  components: {

  },
  filters: {},
  mounted: function() {
    // this.$store.commit('changeBtn', 'home');
    this.$nextTick(function() {
      this.tableScroll('tableId', 400, 30, 10);
    })

  },
  computed: {

  },
  watch: {

  },
  methods: {
    tableScroll(tableid, hei, speed, len) {
      var _this = this;
      clearTimeout(_this.MyMarhq);
      $('#' + tableid).parent().find('.tableid_').remove()
      $('#' + tableid).parent().prepend(
        '<table class="tableid_"><thead>' + $('#' + tableid + ' thead').html() + '</thead></table>'
      ).css({
        'position': 'relative',
        'overflow': 'hidden',
        'height': hei + 'px'
      })
      $(".tableid_").find('th').each(function(i) {
        $(this).css('width', $('#' + tableid).find('th:eq(' + i + ')').width());
      });
      $(".tableid_").css({
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'z-index': 9
      })
      $('#' + tableid).css({
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'z-index': 1
      })

      if ($('#' + tableid).find('tbody tr').length > len) {
        $('#' + tableid).find('tbody').html($('#' + tableid).find('tbody').html() + $('#' + tableid).find('tbody').html());
        $(".tableid_").css('top', 0);
        $('#' + tableid).css('top', 0);
        var tblTop = 0;
        var outerHeight = $('#' + tableid).find('tbody').find("tr").outerHeight();

        function Marqueehq() {
          if (tblTop <= -outerHeight * $('#' + tableid).find('tbody').find("tr").length) {
            tblTop = 0;
          } else {
            tblTop -= 1;
          }
          $('#' + tableid).css('margin-top', tblTop + 'px');
          clearTimeout(_this.MyMarhq);
          _this.MyMarhq = setTimeout(function() {
            Marqueehq()
          }, speed);
        }

        _this.MyMarhq = setTimeout(Marqueehq, speed);
        $('#' + tableid).find('tbody').hover(function() {
          clearTimeout(_this.MyMarhq);
        }, function() {
          clearTimeout(_this.MyMarhq);
          if ($('#' + tableid).find('tbody tr').length > len) {
            _this.MyMarhq = setTimeout(Marqueehq, speed);
          }
        })
      }

    }
  }
}

</script>
<style lang="less">
@import '../assets/less/common.less';
table,tbody,tfoot,thead,tr,th,td {
  margin:0;
  padding:0;
  outline:0;
  font-size:100%;
  vertical-align:baseline;
  background:transparent;
  border-collapse:collapse;
  border-spacing:0;
  border:0px;
}
.tablebox {
  width:
  100%;
  height:400px;
  overflow:hidden;
  margin:50px auto;
}
.tablebox table {
  width:100%;
}
.tablebox table th,.tablebox table td {
  font-size:12px;
  text-align:center;
  line-height:36px;
}
.tablebox table th {
  color:#2584e3;
  background-color:#f6f6f6;
}
.tablebox table td img {
  display:inline-block;
  vertical-align:middle;
}
.tablebox table tbody tr:nth-child(even) {
  background-color:#f6f6f6;
}
.tablebox.table_md table td,.tablebox.table_md table th {
  line-height:40px;
}


</style>
