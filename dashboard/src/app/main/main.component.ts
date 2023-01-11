/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { Weather } from './service/main';
import { MainService } from './service/main.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}

@Component({
  selector: 'internal-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  popupStatus = true;
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];
  public isCollapsed: boolean;
  isVisible = false;

  constructor(
    private service: MainService,
    // private modalService: NzModalService,
    // @Inject(DOCUMENT) private document: Document,
    private element: ElementRef,
    private renderer2: Renderer2
  ) {
    this.isCollapsed = false;
  }

  public navbarCollapsed = true;
  public listData!: Weather;
  public changeIcon = false;
  offsetFlag = false;
  public isNavOpen = false;

  // public isNavOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public scrollSection = false;

  ngOnInit(): void {
    // console.log('on init');
    // this.getChart();
    this.getData();
    this.openForm();
    this.closeForm();

    this.renderer2.listen('document', 'scroll', () => {
      this.getScrollHeight();
    });

    this.renderer2.listen('document', 'scroll', () => {
      scroll;
    });
  }

  public async getData() {
    this.listData = await this.service.getWeatherToPromise();
    console.log(this.listData);
    await this.getChart();
    // this.service.getWeather().subscribe({
    //   next: (res) => {
    //     // console.log(this.listData);
    //     console.log('1');
    //     this.listData = res;
    //     console.log(this.listData);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  // @HostListener('window:scroll', ['$event'])

  getScrollHeight() {
    // console.log(window.pageYOffset, event);
    if (window.pageYOffset < 300) this.offsetFlag = false;
    else this.offsetFlag = true;
    console.log(this.offsetFlag);
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const revealElement = (
      this.element.nativeElement as HTMLElement
    ).querySelectorAll('.reveal');

    const arrLength = revealElement.length;
    for (let i = 0; i < arrLength; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElement[i].getBoundingClientRect().top;

      if (elementTop < windowHeight - 300) {
        revealElement[i].classList.add('active');
      }
      // else {
      //   revealElement[i].classList.remove('active');
      // }
    }

    // const revealElement = this.element.nativeElement.querySelector('.reveal');
    // console.log(revealElement);
  }

  // upcomingProjectModel() {
  //   this.modalService.create({
  //     nzTitle: 'View Task',
  //     nzClassName: 'modal-custom',
  //     nzContent: '<p>Test</p>',
  //     nzWidth: 'modal-custom',
  //     nzCentered: true,
  //     nzMaskClosable: false,
  //     // nzComponentParams: {
  //     //   mode: ModeModal.VIEW,
  //     //   title: 'Xem chi tiết yêu cầu',
  //     //   id: item.id,
  //     // },
  //     nzDirection: 'ltr', // left to right
  //   });
  // }

  scrollToElement($element: any): void {
    console.log($element);
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  toggleSidebar() {
    let mobile = this.element.nativeElement.querySelector('.mobile-nav');
    if (mobile.classList.contains('d-none')) {
      mobile.classList.remove('hide');
      mobile.classList.remove('d-none');
      mobile.classList.add('show');
      mobile.classList.add('d-block');
    } else if (mobile.classList.contains('d-block')) {
      mobile.classList.remove('show');
      mobile.classList.remove('d-block');
      mobile.classList.add('hide');
      setTimeout(() => {
        return mobile.classList.add('d-none');
      }, 500);
    }
  }

  openForm() {
    // console.log(this.popup);
    if (this.changeIcon == false) {
      this.changeIcon = true;
    }
  }

  closeForm() {
    if (this.changeIcon == true) {
      this.changeIcon = false;
    }
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`,
      },
    ];
    this.i++;
  }

  getChart() {
    // console.log('2');
    this.chartOptions = {
      xAxis: {
        crosshair: true,
        categories: [
          this.listData.forecast.forecastday[0].date,
          this.listData.forecast.forecastday[0 + 1].date,
          this.listData.forecast.forecastday[0 + 1 + 1].date,
        ],
        accessibility: {
          description: 'Days',
        },
      },
      yAxis: {
        crosshair: true,
        title: {
          text: 'Nhiệt độ',
        },
        // labels: {
        //   formatter: function () {
        //     return this.value + '°';
        //   },
        // },
      },
      title: {
        // text: 'Average Temperature in Days',
        text: '',
      },
      tooltip: {
        shared: true,
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1,
          },
        },
        line: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Nhiệt độ cao nhất (°C)',
          type: 'line',
          marker: {
            symbol: 'square',
          },
          data: [
            this.listData.forecast.forecastday[0].day.maxtemp_c,
            this.listData.forecast.forecastday[0 + 1].day.maxtemp_c,
            this.listData.forecast.forecastday[0 + 1 + 1].day.maxtemp_c,
          ],
        },

        {
          name: 'Nhiệt độ trung bình (°C)',
          type: 'line',
          marker: {
            symbol: 'diamond',
          },
          data: [
            this.listData.forecast.forecastday[0].day.avgtemp_c,
            this.listData.forecast.forecastday[0 + 1].day.avgtemp_c,
            this.listData.forecast.forecastday[0 + 1 + 1].day.avgtemp_c,
          ],
        },

        {
          name: 'Nhiệt độ thấp nhất (°C)',
          type: 'line',
          marker: {
            symbol: 'triangle',
          },
          data: [
            this.listData.forecast.forecastday[0].day.mintemp_c,
            this.listData.forecast.forecastday[0 + 1].day.mintemp_c,
            this.listData.forecast.forecastday[0 + 1 + 1].day.mintemp_c,
          ],
        },
      ],
    };
  }
}
