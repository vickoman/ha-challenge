import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CurrencyPipe]
})
export class HomeComponent implements OnInit {

  columnsHeader: string[] = ["Nombre Empresa", "Total  de Ventas", "Comision", "Detalle"];
  filtered: any[] = []
  dataRows: any[] = []
  general: any[] = []

  constructor( private salesService: SalesService, private currencyPipe: CurrencyPipe) { 
  }

  ngOnInit(): void {
    this.salesService.getSales().subscribe(resp => {
        this.general = resp.map((e: any) => {
          const {datePayment, nameAgency, finalPrice} = e.payload.doc.data();
          return {
            nameAgency,
            finalPrice,
            datePayment
          };
        })
        this.groupBy();
        this.dataRows = this.groupBy();
    })
  }

  formatMoney(result) {
    return result.map(v => {
      v.finalPrice = this.currencyPipe.transform(v.finalPrice, '$', 'symbol', '1.2-2');
      v.comision = this.currencyPipe.transform(v.comision, '$', 'symbol', '1.2-2');
    })
  }

  groupBy() {
    var result = [];
    const total = this.general.reduce((res, value) => {
      if (!res[value.nameAgency]) {
        res[value.nameAgency] = { nameAgency: value.nameAgency, finalPrice: 0, comision: 0, detalle: "" };
        result.push(res[value.nameAgency])
      }
      res[value.nameAgency].finalPrice += value.finalPrice;
      res[value.nameAgency].comision += value.finalPrice * 0.025;
      res[value.nameAgency].detalle = "Ver Detalle";
      return res;
    }, {});
    this.formatMoney(result);
    return result;
  }

}
