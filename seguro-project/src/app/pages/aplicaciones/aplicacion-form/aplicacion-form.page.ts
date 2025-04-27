import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AplicacionesService } from '../../../services/aplicaciones.service';

@Component({
  selector: 'app-aplicacion-form',
  templateUrl: './aplicacion-form.page.html',
  styleUrls: ['./aplicacion-form.page.scss'],
})
export class AplicacionFormPage implements OnInit {
  aplicacionForm!: FormGroup;
  isEdit = false;
  registro = 0;

  constructor(
    private fb: FormBuilder,
    private aplicacionesService: AplicacionesService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.aplicacionForm = this.createForm();
  }

  ngOnInit() {
    const registroParam = this.route.snapshot.paramMap.get('registro');
    if (registroParam) {
      this.isEdit = true;
      this.registro = +registroParam;
      this.loadAplicacion();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      fecha: ['', Validators.required],
      cultivo: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(0)]],
      producto: ['', Validators.required],
      descripcion: [''],
      ingrediente_activo: ['', Validators.required],
      dosis: ['', Validators.required],
      objetivo: ['', Validators.required],
      aplicador: ['', Validators.required],
      epi_usado: [true],
      tipo_pico: ['Conico', Validators.required],
      vol_agua: ['', [Validators.required, Validators.min(0)]],
      temperatura: ['', [Validators.required, Validators.min(-50), Validators.max(60)]],
      humedad: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      velocidad_viento: ['', [Validators.required, Validators.min(0)]],
      departamento: ['', Validators.required],
      distrito: ['', Validators.required],
      localidad: ['', Validators.required],
      parcela_nro: ['', Validators.required],
      productor: ['', Validators.required],
      matricula_profesional: ['354'],
      registro_senave: ['2'],
      entidad_comercializadora: [''],
      reg_producto: [''],
      receta_nro: [''],
      fecha_exp: ['']
    });
  }

  private async loadAplicacion() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.aplicacionesService.getAplicacion(this.registro).subscribe(
      (aplicacion) => {
        this.aplicacionForm.patchValue({
          ...aplicacion,
          fecha: aplicacion.fecha.split('T')[0]
        });
        loading.dismiss();
      },
      error => {
        console.error('Error al cargar aplicación:', error);
        loading.dismiss();
        this.showToast('Error al cargar los datos de la aplicación', 'danger');
      }
    );
  }

  async onSubmit() {
    if (this.aplicacionForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Guardando...'
      });
      await loading.present();

      const aplicacion = this.aplicacionForm.value;

      const request = this.isEdit
        ? this.aplicacionesService.updateAplicacion(this.registro, aplicacion)
        : this.aplicacionesService.createAplicacion(aplicacion);

      request.subscribe(
        () => {
          loading.dismiss();
          this.showToast(
            this.isEdit ? 'Aplicación actualizada correctamente' : 'Aplicación creada correctamente',
            'success'
          );
          this.router.navigate(['/aplicaciones']);
        },
        error => {
          console.error('Error al guardar aplicación:', error);
          loading.dismiss();
          this.showToast('Error al guardar la aplicación', 'danger');
        }
      );
    } else {
      this.showToast('Por favor, complete todos los campos requeridos', 'warning');
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}
