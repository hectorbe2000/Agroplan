import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ParcelasService } from '../../../services/parcelas.service';
import { Parcela } from '../../../interfaces/parcela.interface';

@Component({
  selector: 'app-parcela-form',
  templateUrl: './parcela-form.page.html',
  styleUrls: ['./parcela-form.page.scss'],
})
export class ParcelaFormPage implements OnInit {
  parcelaForm: FormGroup;
  isEdit = false;
  parcelaId?: number;

  constructor(
    private fb: FormBuilder,
    private parcelasService: ParcelasService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.parcelaForm = this.fb.group({
      DESC_LOTE: ['', [Validators.required]],
      LOTE: ['', [Validators.required]],
      SUPERFICIE: ['', [Validators.required]],
      LOCALIDAD: ['', [Validators.required]],
      DISTRITO: ['', [Validators.required]],
      CLIENTE: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.parcelaId = +id;
      this.loadParcela(this.parcelaId);
    }
  }

  async loadParcela(id: number) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.parcelasService.getParcela(id).subscribe(
      (parcela) => {
        this.parcelaForm.patchValue(parcela);
        loading.dismiss();
      },
      async (error) => {
        console.error('Error loading parcela:', error);
        loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Error al cargar la parcela',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    );
  }

  async onSubmit() {
    if (this.parcelaForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Guardando...',
      });
      await loading.present();

      const parcela: Parcela = this.parcelaForm.value;

      const action = this.isEdit
        ? this.parcelasService.updateParcela(this.parcelaId!, parcela)
        : this.parcelasService.createParcela(parcela);

      action.subscribe(
        async () => {
          loading.dismiss();
          const toast = await this.toastController.create({
            message: `Parcela ${this.isEdit ? 'actualizada' : 'creada'} exitosamente`,
            duration: 2000,
            color: 'success'
          });
          toast.present();
          this.router.navigate(['/parcelas']);
        },
        async (error) => {
          console.error('Error saving parcela:', error);
          loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Error al guardar la parcela',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      );
    }
  }
}
