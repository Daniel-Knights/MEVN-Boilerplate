<template>
    <div class="pages">
        <div class="paginate-left-container">
            <div
                @click="paginate"
                class="pagination left"
                :class="{ 'disabled-pagination': disabledLeft }"
            >
                &lt;
            </div>
        </div>
        <div class="page-container">
            <div
                v-if="
                    overflow && (get.current_page > 3 || get.current_page === 2)
                "
                @click="fetch(1)"
                class="page selectable"
            >
                {{ 1 }}
            </div>
            <div
                v-if="enterPageOne"
                v-click-outside="enterPageClickOutside"
                class="page"
            >
                <input
                    v-model="enterPageOneValue"
                    @keydown.enter="enterPageHandler"
                    data-enter="1"
                    type="number"
                    placeholder="pg."
                />
            </div>
            <div
                @click="enterPageOne = true"
                v-if="overflow && get.current_page > 2 && !enterPageOne"
                class="page"
            >
                ...
            </div>
            <div class="page selectable">
                {{ get.current_page }}
            </div>
            <div
                @click="enterPageTwo = true"
                v-if="
                    overflow &&
                        get.current_page < get.last_page - 1 &&
                        !enterPageTwo
                "
                class="page"
            >
                ...
            </div>
            <div
                v-if="enterPageTwo"
                v-click-outside="enterPageClickOutside"
                class="page"
            >
                <input
                    v-model="enterPageTwoValue"
                    @keydown.enter="enterPageHandler"
                    data-enter="2"
                    type="number"
                    placeholder="pg."
                />
            </div>
            <div
                v-if="overflow && get.current_page !== get.last_page"
                @click="
                    fetch(get.last_page);
                    selectedPage();
                "
                class="page selectable"
            >
                {{ get.last_page }}
            </div>
        </div>
        <div class="paginate-right-container mobile">
            <div
                @click="paginate"
                class="pagination right"
                :class="{ 'disabled-pagination': disabledRight }"
            >
                &gt;
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Page",

    props: ["get", "fetch"],

    data() {
        return {
            overflow: false,
            enterPageOne: false,
            enterPageTwo: false,
            enterPageOneValue: "",
            enterPageTwoValue: ""
        };
    },

    computed: {
        disabledLeft: function() {
            return this.get.current_page === 1;
        },
        disabledRight: function() {
            return this.get.current_page === this.get.last_page;
        }
    },

    methods: {
        selectedPage() {
            let pages = document.querySelectorAll(".page");
            for (let i of pages) {
                if (this.get.current_page === Number(i.innerText)) {
                    i.className = "page selected";
                } else {
                    i.className = "page selectable";
                }
            }
        },
        pageOverflow() {
            if (this.get.last_page > 3) {
                this.overflow = true;
            } else {
                this.overflow = false;
            }
        },
        enterPageHandler(e) {
            let oneVal = Number(this.enterPageOneValue);
            let twoVal = Number(this.enterPageTwoValue);

            if (e.target.dataset.enter === "1") {
                if (oneVal < this.get.last_page + 1 && oneVal > 0) {
                    this.fetch(oneVal);

                    this.enterPageOne = false;
                    this.enterPageOneValue = "";
                } else if (
                    oneVal > this.get.last_page ||
                    oneVal === 0 ||
                    this.enterPageOneValue === ""
                ) {
                    e.target.style.border = "1px solid red";
                    this.enterPageOneValue = "";
                }
            } else {
                if (twoVal < this.get.last_page + 1 && twoVal > 0) {
                    this.fetch(twoVal);

                    this.enterPageTwo = false;
                    this.enterPageTwoValue = "";
                } else if (
                    twoVal > this.get.last_page ||
                    twoVal === 0 ||
                    this.enterPageTwoValue === ""
                ) {
                    e.target.style.border = "1px solid red";
                    this.enterPageTwoValue = "";
                }
            }
        },
        enterPageClickOutside() {
            this.enterPageOne = false;
            this.enterPageTwo = false;
        },
        paginate(e) {
            if (
                e.target.className.includes("left") &&
                this.get.current_page > 1
            ) {
                this.fetch(this.get.current_page - 1);
            } else if (
                e.target.className.includes("right") &&
                this.get.current_page < this.get.last_page
            ) {
                this.fetch(this.get.current_page + 1);
            }
        }
    },

    mounted() {
        this.selectedPage();
        this.pageOverflow();
    },

    updated() {
        this.selectedPage();
    }
};
</script>
