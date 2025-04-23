import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ParcelasService } from '../../services/parcelas.service';
import { Parcela } from '../../interfaces/parcela.interface';

@Component({
  selector: 'app-parcelas',
  templateUrl: './parcelas.page.html',
  styleUrls: ['./parcelas.page.scss'],
})
export class ParcelasPage implements OnInit {
  parcelas: Parcela[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  isLoading: boolean = false;

  constructor(
    private parcelasService: ParcelasService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadParcelas();
  }

  loadParcelas(event?: any) {
    if (this.isLoading) return;
    this.isLoading = true;

    this.parcelasService.getParcelas(this.currentPage, this.itemsPerPage, this.searchTerm).subscribe(
      (response: any) => {
        if (event?.target?.complete) {
          event.target.complete();
        }
        
        if (this.currentPage === 1) {
          this.parcelas = response.data;
        } else {
          this.parcelas = [...this.parcelas, ...response.data];
        }
        
        this.totalPages = Math.ceil(response.total / this.itemsPerPage);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading parcelas:', error);
        this.isLoading = false;
        if (event?.target?.complete) {
          event.target.complete();
        }
      }
    );
  }

  onSearchChange(event: any) {
    this.currentPage = 1;
    this.searchTerm = event.detail.value;
    this.loadParcelas();
  }

  doRefresh(event: any) {
    this.currentPage = 1;
    this.loadParcelas(event);
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadParcelas(event);
  }

  async confirmDelete(parcela: Parcela) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro que desea eliminar la parcela ${parcela.DESC_LOTE}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteParcela(parcela.REGISTRO);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteParcela(id: number) {
    this.parcelasService.deleteParcela(id).subscribe(
      async () => {
        const toast = await this.toastController.create({
          message: 'Parcela eliminada exitosamente',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.currentPage = 1;
        this.loadParcelas();
      },
      async (error) => {
        console.error('Error deleting parcela:', error);
        const toast = await this.toastController.create({
          message: 'Error al eliminar la parcela',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    );
  }
}
