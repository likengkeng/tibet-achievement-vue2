<template>
  <div style="position: relative;">
    <span class="prev-event move-event" @click="showPrev"></span>
    <ul class="timeline">
      <li class='timeItem' v-for="(item, index) in currentList" :key="index">
        <div class="relative">
          <span class='date'>
            <label>{{ item.date }}</label>
          </span>
          <input
            class='radio'
            name='time-radio'
            type='radio'
            :checked="select.id === item.id"
            @change="changeSelectedEvent(item)">
          <label></label>
          <span class="line"></span>
          <div
            class='content'
            :class="{ selected: select.id === item.id }"
            @click="changeSelectedEvent(item)">
            <img src="../imgs/news1.jpg" class="event-img">
            <div>
              <p><h4>{{ item.content.title }}</h4></p>
              <span>{{ item.content.desc }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <span class="next-event move-event" @click="showNext"></span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
interface TimeItem {
  id: string;
  date: string;
  content: {
    img: string;
    title: string;
    desc: string;
  },
}
@Component({
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    select: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    list() {
      this.getCurrentList();
    },
  },
})
export default class TimeLine extends Vue {
  size: number = 5;
  index: number = 0;
  declare list: TimeItem[];
  currentList: TimeItem[] = [];

  getCurrentList() {
    const end = this.index + this.size >= this.list.length ? this.list.length : this.index + this.size;
    this.currentList = this.list.slice(this.index, end);
  }

  changeSelectedEvent(data) {
    this.$emit('update:select', data);
  }

  showPrev() {
    if (this.index > 0) {
      this.index -= 1;
      this.getCurrentList();
    }
  }

  showNext() {
    if (this.index < this.list.length - this.size) {
      this.index += 1;
      this.getCurrentList();
    }
  }
}
</script>
<style scoped lang="scss">
$line_width: 210px;
.timeline {
  list-style: none;
  padding-top: 80px;
  display: inline-block;
  border-spacing: 200px 0;
  li {
    display: table-cell;
    .relative {
      position: relative;;
    }
    .date {
      text-align: center;
      top: -70px;
      left: -140px;
      right: 0;
      font-size: 0.95em;
      line-height: 20px;
      position: absolute;
      width: 200px;
    }
    .radio {
      margin: 0 auto;
      top: -17px;
      left: -50px;
      width: 30px;
      height: 30px;
      border: 5px solid #D8D8D8;
      border-radius: 50%;
      display: block;
      position: absolute;
      z-index: 101;
      opacity: 0;
    }
    .line {
      content: '';
      width: $line_width;
      height: 8px;
      background: #D8D8D8;
      position: absolute;
      top: -6px;
      left: -130px;
    }
    .radio + label::before{
      border: 5px solid #D8D8D8;
      border-radius: 50%;
      background: #FFFFFF;
      content: "";
      display: inline-block;
      height: 20px;
      width: 20px;
      position: absolute;
      top: -17px;
      z-index: 100;
      left: -50px;
    }
    .radio:checked + label::before{
      background: #681313;
    }
    .content {
      position: absolute;
      width: 180px;
      height: 300px;
      left: -140px;
      top: 30px;
      cursor: pointer;
      .event-img {
        width: 100%;
        height: 140px;
      }
    }
    .content:hover {
      border: 8px solid #FFBC66;
    }
    .content.selected {
      border: 8px solid #FFBC66;
    }
  }
}

.move-event {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-repeat:no-repeat;
  position: absolute;
  top: 98px;
  cursor: pointer;
}

.prev-event {
  background-image: url('../imgs/prevArrow1x.png');
  left: 0px;
}
.next-event {
  background-image: url('../imgs/nextArrow1x.png');
  right: 0px;
}
</style>
