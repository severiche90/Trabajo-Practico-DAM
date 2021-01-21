import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { Medicion } from '../model/Medicion';
import { Riego } from '../model/Riego';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';
import { RiegoService } from '../services/riego.service'
import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);


@Component({
    selector: 'app-dispositivo',
    templateUrl: './dispositivo.page.html',
    styleUrls: ['./dispositivo.page.scss'],
})

export class DispositivoPage 
{
    
	public dispositivo: Dispositivo;

	private _lastMeasurement: Medicion;

	private _lastSprinkle: Riego;
	
    public idDispositivo: string;

	public idElectrovalvula: number;

	private _valorObtenido: number = 0;

	
	public valveState: boolean = false;

	public myChart;
	
	private _chartOptions;
      
    constructor(private router: ActivatedRoute, public measurementService: MedicionService, public deviceService: DispositivoService, public riegoService: RiegoService)
    { 
		this.idDispositivo = this.router.snapshot.paramMap.get('id');
        this.getValveId();
        this.getValveState();
		this.getSensorMeasurement();
    }

	ngOnInit() 
	{

    }

	ionViewWillEnter() 
	{
        this.generarChart();
	}

	// Método utilizado para obtener el "id" de la electroválvula asociada al sensor.
	async getValveId()
	{
		
		await this.deviceService.getElectrovalvula(this.idDispositivo).then((valve) => {
			
			this.dispositivo = valve;
			this.idElectrovalvula = this.dispositivo.electrovalvulaId;
		});
	}

	// Método utilizado para obtener el estado actual de la electroválvula.
	async getValveState()
	{
		
		await this.riegoService.getRiego(this.idDispositivo).then((state) => {
			
		    this._lastSprinkle = state;
			this.valveState = Boolean(this._lastSprinkle.apertura);
		});
	}

	// Método utilizado para obtener la última medición del sensor.
	async getSensorMeasurement()
	{
		
		await this.measurementService.getMedicion(this.idDispositivo).then((measurement) => {
			
			this._lastMeasurement = measurement;
			this._valorObtenido = Number(this._lastMeasurement.valor);
            this.updateChart();
		});
	}

	// Método utilizado para abrir la electroválvula.
	public actionOpenValve()
	{
		this.valveState = false;
        let newSprinkle: Riego = new Riego(1, 1, this.getTimeStamp(), this.idElectrovalvula)
		this.riegoService.postRiego(newSprinkle);
	}

	// Método utilizado para cerrar la electroválvula.
	public actionCloseValve()
	{
		this.valveState = true;
		let randomSensorValue = Math.round(Math.random() * (this._valorObtenido - (this._valorObtenido - 5)) + (this._valorObtenido - 5));
        let newMeasurement: Medicion = new Medicion(1, this.getTimeStamp(), randomSensorValue, this.idElectrovalvula);
        this.measurementService.postMedicion(newMeasurement);
		let newSprinkle: Riego = new Riego(1, 0, this.getTimeStamp(), this.idElectrovalvula)
        this.riegoService.postRiego(newSprinkle);
        this.getSensorMeasurement();
	}

	// Método privado para obtener la fecha y hora actual.
	private getTimeStamp(): string
	{
		
		let date: Date = new Date;
        let day: string = String(date.getDate());
        let month: string = String(date.getMonth() + 1);
        let year: string = String(date.getFullYear());
        let hours: string = String(date.getHours());
        let minutes: string = String(date.getMinutes());
        let seconds: string = String(date.getSeconds());
        let timeStamp: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		return(timeStamp);
	}

	updateChart()
	{
		this.myChart?.update({series: [{
			name: 'kPA',
			data: [this._valorObtenido],
			tooltip: {
				valueSuffix: ' kPA'
			}
		}]});
	}

	// Función para generar el gráfico de Highcharts.
	generarChart()
	{
		this._chartOptions = {
			chart: 
			{
				type: 'gauge',
				plotBackgroundColor: null,
				plotBackgroundImage: null,
				plotBorderWidth: 0,
				plotShadow: false
			}
			,title: 
			{
				text: ''
			}
			,credits:
			{
				enabled:false
			}
			,pane: 
			{
				startAngle: -150,
				endAngle: 150
			} 
			,yAxis: 
			{
				min: 0,
				max: 100,
				minorTickInterval: 'auto',
				minorTickWidth: 1,
				minorTickLength: 10,
				minorTickPosition: 'inside',
				minorTickColor: '#666',
				tickPixelInterval: 30,
				tickWidth: 2,
				tickPosition: 'inside',
				tickLength: 10,
				tickColor: '#666',
				labels: 
				{
					step: 2,
					rotation: 'auto'
				},
				title: 
				{
					text: 'kPA'
				},
				plotBands: [{
					from: 0,
					to: 10,
					color: '#b2ff59' // green 55BF3B
				}, 
				{
					from: 10,
					to: 30,
					color: '#ffff00' // yellow DDDF0D
				}, 
				{
					from: 30,
					to: 100,
					color: '#ff5252' // red DF5353
				}]
			}
			,series: [{
				name: 'kPA',
				data: [this._valorObtenido],
				tooltip: 
				{
					valueSuffix: ' kPA'
				}
			}]
		};
		
		Highcharts.setOptions({
			chart: {
				style: {
					fontFamily: 'roboto'
				}
			}
		});
		
		// Generar el gráfico.
		this.myChart = Highcharts.chart('highcharts', this._chartOptions );
	}
}