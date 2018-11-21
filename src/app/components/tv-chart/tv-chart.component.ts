import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import {
  widget,
  IChartingLibraryWidget,
  ChartingLibraryWidgetOptions,
} from '../../../assets/charting_library/charting_library.min';

import {
  SharedService,
} from '../../services';

@Component({
  selector: 'app-tv-chart',
  templateUrl: './tv-chart.component.html',
  styleUrls: ['./tv-chart.component.scss'],
})
export class TvChartComponent implements OnInit {
  private _symbol: ChartingLibraryWidgetOptions['symbol'] = 'Bitfinex:BTCUSD';
  private _interval: ChartingLibraryWidgetOptions['interval'] = '15';
  // BEWARE: no trailing slash is expected in feed URL

  private _datafeedUrl = 'http://trade.vitanova.online:50091/charts';
  //private _datafeedUrl = 'http://192.168.5.60:4447/charts';

  private _libraryPath: ChartingLibraryWidgetOptions['library_path'] = '/assets/charting_library/';
  private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] = 'https://saveload.tradingview.com';
  private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] = '1.1';
  private _clientId: ChartingLibraryWidgetOptions['client_id'] = 'tradingview.com';
  private _userId: ChartingLibraryWidgetOptions['user_id'] = 'public_user_id';
  private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
  private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
  private _containerId: ChartingLibraryWidgetOptions['container_id'] = 'tv_chart_container';
  private _tvWidget: IChartingLibraryWidget | null = null;

  @Input()
  set symbol(symbol: ChartingLibraryWidgetOptions['symbol']) {
    this._symbol = symbol || this._symbol;
  }

  @Input()
  set interval(interval: ChartingLibraryWidgetOptions['interval']) {
    this._interval = interval || this._interval;
  }

  @Input()
  set datafeedUrl(datafeedUrl: string) {
    this._datafeedUrl = datafeedUrl || this._datafeedUrl;
  }

  @Input()
  set libraryPath(libraryPath: ChartingLibraryWidgetOptions['library_path']) {
    this._libraryPath = libraryPath || this._libraryPath;
  }

  @Input()
  set chartsStorageUrl(chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']) {
    this._chartsStorageUrl = chartsStorageUrl || this._chartsStorageUrl;
  }

  @Input()
  set chartsStorageApiVersion(chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']) {
    this._chartsStorageApiVersion = chartsStorageApiVersion || this._chartsStorageApiVersion;
  }

  @Input()
  set clientId(clientId: ChartingLibraryWidgetOptions['client_id']) {
    this._clientId = clientId || this._clientId;
  }

  @Input()
  set userId(userId: ChartingLibraryWidgetOptions['user_id']) {
    this._userId = userId || this._userId;
  }

  @Input()
  set fullscreen(fullscreen: ChartingLibraryWidgetOptions['fullscreen']) {
    this._fullscreen = fullscreen || this._fullscreen;
  }

  @Input()
  set autosize(autosize: ChartingLibraryWidgetOptions['autosize']) {
    this._autosize = autosize || this._autosize;
  }

  @Input()
  set containerId(containerId: ChartingLibraryWidgetOptions['container_id']) {
    this._containerId = containerId || this._containerId;
  }

  constructor(
    private sharedService: SharedService,
  ) {
  }

  ngOnInit() {
    this.initChart();

    this.sharedService.subject.subscribe(() => {
      this.initChart();
    });
  }

  initChart() {
    new widget({
      symbol: this._symbol,
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(this._datafeedUrl, 20000),
      interval: this._interval,
      container_id: this._containerId,
      library_path: this._libraryPath,
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: [],
      client_id: this._clientId,
      user_id: this._userId,
      locale: 'en',
      fullscreen: this._fullscreen,
      autosize: this._autosize,
      // theme: 'Dark',
    });
  }
}
