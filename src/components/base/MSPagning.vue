<template>
  <div class="m-paging">
    <div class="m-paging-left">
      Tổng số
      <span class="fw-700">{{ Intl.NumberFormat().format(totalRecord) }}</span> bản
      ghi
    </div>
    <div class="m-paging-center">
      <div class="combobox">
        <ms-combobox
            :isShowPageSize="isShowPageSize"
            :option="option"
            :pageSize="pageSize"
            @toggleCombobox="openCombobox"
            @handleChangePageSize="handleChangePageSize"
        />
      </div>
    </div>
    <div class="m-paging-right">
      <div class="prev-page mr-4">
        <button
            :class="{
						'not-allowed': currentPage === 1,
					}"
            :disabled="currentPage === 1"
            @click="prevPage"
        >
          Trước
        </button>
      </div>
      <div class="page-number">
        <button
            v-for="(page, index) in pages"
            :key="index"
            :class="['number-page', { selected: page === currentPage, disabled: page === '...' }]"
            :disabled="page === '...'"
            @click="onChangePage(page)"
        >
          {{ page }}
        </button>
      </div>
      <div class="next-page ml-4">
        <button
            :class="{
						'not-allowed': currentPage === totalPage,
					}"
            :disabled="currentPage === totalPage"
            @click="nextPage"
        >
          Sau
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MsCombobox from "@/components/base/MSCombobox.vue";

export default {
  name: "MSPaging",
  data() {
    return {
      isShowPageSize: false,
      option: [
        {value: 10, title: "10 bản ghi trên 1 trang"},
        {value: 20, title: "20 bản ghi trên 2 trang"},
        {value: 50, title: "50 bản ghi trên 5 trang"},
        {value: 100, title: "100 bản ghi trên 1 trang"},
      ],
    };
  },
  props: {
    totalPage: {
      type: Number,
      default: 1,
    },
    totalRecord: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 20,
    }
  },
  components: {
    MsCombobox,
  },
  methods: {
    /**
     * Mở combobox
     * @param isShowPageSize Boolean
     * @since 06/03/2022
     * @author Nguyễn Văn Linh
     */
    openCombobox(isShowPageSize) {
      this.isShowPageSize = isShowPageSize;
    },

    /**
     * Emit ra cpn cha thay đổi paggeSize
     * @param pageSize - Number
     * @since 06/03/2022
     * @author Nguyễn Văn Linh
     */
    handleChangePageSize(pageSize) {
      this.$emit("handleChangePageSize", parseInt(pageSize));
    },

    /**
     * Emit ra cpn cha thay đổi currentPage
     * @param page - Number
     * @since 06/03/2022
     * @author Nguyễn Văn Linh
     */
    onChangePage(page) {
      this.$emit("handleChangCurrentPage", page);
    },

    /**
     * Nhấn nút 'trang trước', emit ra cpn cha xử lý
     * @since 06/03/2022
     * @author Nguyễn Văn Linh
     */
    prevPage() {
      let page = this.currentPage;
      page--;
      this.$emit("handleChangCurrentPage", page)
    },

    /**
     * Nhấn nút 'trang sau', emit ra cpn cha xử lý
     * @since 06/03/2022
     * @author Nguyễn Văn Linh
     */
    nextPage() {
      let page = this.currentPage;
      page++;
      this.$emit("handleChangCurrentPage", page)
    },

    /**
     * Xử lý phân trang
     * @param currentPage
     * @param totalPage
     * @returns {*[]}
     */
    pagination(currentPage, totalPage) {
      let current = currentPage,
          last = totalPage,
          delta = 2,
          left = current - delta,
          right = current + delta + 1,
          range = [],
          rangeWithDots = [],
          l;

      for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || i >= left && i < right) {
          range.push(i);
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      return rangeWithDots;
    }
  },
  computed: {
    pages() {
      return this.pagination(this.currentPage, this.totalPage);
    },
  }
};
</script>

<style>
.combobox {
  width: 175px;
}
</style>
