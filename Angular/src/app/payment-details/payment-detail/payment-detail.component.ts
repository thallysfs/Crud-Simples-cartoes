import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private service: PaymentDetailService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form != null) {
      form.resetForm();
    }
    this.service.formData = {
      PMId: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: ''
    }
  }

  onSubmit(form: NgForm) {
    // se o id for igual a zero, insere o novo registro no form. Senão, atualiza.
    if(this.service.formData.PMId == 0 ){
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }

  }

  // inserir registros
  insertRecord(form: NgForm){
    this.service.postPaymentDetail().subscribe(
      // se der certo
      res => {
        this.resetForm(form);
        this.toastr.success('Salvo com sucesso', 'Forma de Pagamento');
        this.service.refreshList();
      },
      // se der errado
      err => {
        console.log(err);
      }
    )
  }

  // atualizar registros
  updateRecord(form: NgForm){
    this.service.putPaymentDetail().subscribe(
      // se der certo
      res => {
        this.resetForm(form);
        this.toastr.info('Atualizado com sucesso', 'Forma de Pagamento');
        this.service.refreshList();
      },
      // se der errado
      err => {
        console.log(err);
      }
    )
  }



}
