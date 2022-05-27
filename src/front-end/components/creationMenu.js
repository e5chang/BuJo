/* eslint-disable */
import * as localStorage from "../localStorage/userOperations.js";
import { DropdownBlock } from "./dropdown.js";
import { createEditor } from "./blockController.js";
import { currentObject } from "../index.js";

const template = document.createElement("template");
const datePickerStyles = `.qs-datepicker-container{font-size:1rem;font-family:SF-Pro;color:#000;position:absolute;width:15.625em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:9001;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid grey;border-radius:.263921875em;overflow:hidden;background:#fff;-webkit-box-shadow:0 1.25em 1.25em -.9375em rgba(0,0,0,.3);box-shadow:0 1.25em 1.25em -.9375em rgba(0,0,0,.3)}.qs-datepicker-container *{-webkit-box-sizing:border-box;box-sizing:border-box}.qs-centered{position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.qs-hidden{display:none}.qs-overlay{position:absolute;top:0;left:0;background:rgba(0,0,0,.75);color:#fff;width:100%;height:100%;padding:.5em;z-index:1;opacity:1;-webkit-transition:opacity .3s;transition:opacity .3s;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.qs-overlay.qs-hidden{opacity:0;z-index:-1}.qs-overlay .qs-overlay-year{background:rgba(0,0,0,0);border:none;border-bottom:1px solid #fff;border-radius:0;color:#fff;font-size:.875em;padding:.25em 0;width:80%;text-align:center;margin:0 auto;display:block}.qs-overlay .qs-overlay-year::-webkit-inner-spin-button{-webkit-appearance:none}.qs-overlay .qs-close{padding:.5em;cursor:pointer;position:absolute;top:0;right:0}.qs-overlay .qs-submit{border:1px solid #fff;border-radius:.263921875em;padding:.5em;margin:0 auto auto;cursor:pointer;background:hsla(0,0%,50.2%,.4)}.qs-overlay .qs-submit.qs-disabled{color:grey;border-color:grey;cursor:not-allowed}.qs-overlay .qs-overlay-month-container{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.qs-overlay .qs-overlay-month{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:calc(100% / 3);cursor:pointer;opacity:.5;-webkit-transition:opacity .15s;transition:opacity .15s}.qs-overlay .qs-overlay-month.active,.qs-overlay .qs-overlay-month:hover{opacity:1}.qs-controls{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0;background:#d3d3d3;-webkit-filter:blur(0);filter:blur(0);-webkit-transition:-webkit-filter .3s;transition:-webkit-filter .3s;transition:filter .3s;transition:filter .3s,-webkit-filter .3s}.qs-controls.qs-blur{-webkit-filter:blur(5px);filter:blur(5px)}.qs-arrow{height:1.5625em;width:1.5625em;position:relative;cursor:pointer;border-radius:.263921875em;-webkit-transition:background .15s;transition:background .15s}.qs-arrow:hover{background:rgba(0,0,0,.1)}.qs-arrow:hover.qs-left:after{border-right-color:#000}.qs-arrow:hover.qs-right:after{border-left-color:#000}.qs-arrow:after{content:"";border:.390625em solid rgba(0,0,0,0);position:absolute;top:50%;-webkit-transition:border .2s;transition:border .2s}.qs-arrow.qs-left:after{border-right-color:grey;right:50%;-webkit-transform:translate(25%,-50%);-ms-transform:translate(25%,-50%);transform:translate(25%,-50%)}.qs-arrow.qs-right:after{border-left-color:grey;left:50%;-webkit-transform:translate(-25%,-50%);-ms-transform:translate(-25%,-50%);transform:translate(-25%,-50%)}.qs-month-year{font-weight:700;-webkit-transition:border .2s;transition:border .2s;border-bottom:1px solid rgba(0,0,0,0);cursor:pointer}.qs-month-year:hover{border-bottom:1px solid grey}.qs-month-year:active:focus,.qs-month-year:focus{outline:none}.qs-month{padding-right:.5ex}.qs-year{padding-left:.5ex}.qs-squares{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:.3125em;-webkit-filter:blur(0);filter:blur(0);-webkit-transition:-webkit-filter .3s;transition:-webkit-filter .3s;transition:filter .3s;transition:filter .3s,-webkit-filter .3s}.qs-squares.qs-blur{-webkit-filter:blur(5px);filter:blur(5px)}.qs-square{width:calc(100% / 7);height:1.5625em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;cursor:pointer;-webkit-transition:background .1s;transition:background .1s;border-radius:.263921875em}.qs-square:not(.qs-empty):not(.qs-disabled):not(.qs-day):not(.qs-active):hover{background:orange}.qs-current{font-weight:700;text-decoration:underline}.qs-active,.qs-range-end,.qs-range-start{background:#add8e6}.qs-range-start:not(.qs-range-6){border-top-right-radius:0;border-bottom-right-radius:0}.qs-range-middle{background:#d4ebf2}.qs-range-middle:not(.qs-range-0):not(.qs-range-6){border-radius:0}.qs-range-middle.qs-range-0{border-top-right-radius:0;border-bottom-right-radius:0}.qs-range-end:not(.qs-range-0),.qs-range-middle.qs-range-6{border-top-left-radius:0;border-bottom-left-radius:0}.qs-disabled,.qs-outside-current-month{opacity:.2}.qs-disabled{cursor:not-allowed}.qs-day,.qs-empty{cursor:default}.qs-day{font-weight:700;color:grey}.qs-event{position:relative}.qs-event:after{content:"";position:absolute;width:.46875em;height:.46875em;border-radius:50%;background:#07f;bottom:0;right:0}`;
const futureLogCreator = `
<form class="future" title="New Future Log">
    <label>From: <br />
        <input id="futureFrom" name="future-from">
    </label>
	<label>To: <br />
        <input id="futureTo" name="future-to">
    </label>
</form>
`;
const monthlyLogCreator = `
<form class="monthly" title="New Monthly Log">
	<label>From: <br />
	<input id="monthlyFrom" name="monthly-from">
	</label>
	<label>To: <br />
	<input id="monthlyTo" name="monthly-to">
	</label>
</form>
`;
const dailyLogCreator = `
<form class="daily" title="New Daily Log">
	<label for="daily-title">Title:</label>
	<input type="text" id="daily" name="daily">
</form>
`;
const collectionCreator = `
<form class="collection" title="New Collection">
	<label for="collection-title">Title:</label>
	<input type="text" id="collection-title" name="collection-title">
</form>
`;
const trackerCreator = `
<form class="tracker" title="New Tracker">
	<label for="tracker">New Tracker</label>
	<label for="tracker-title">Title:</label>
	<input type="text" id="tracker-title" name="tracker-title">
</form>
`;

template.innerHTML = `
    <style>
		${datePickerStyles}

        :host {
            font-family: "SF-Pro";
        }
        
        /* The Popup background */
        .popup {
            background: white;
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            bottom: 0; /* Full width */
            right: 0; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: #0000007F; /* Black w/ opacity */
        }

        /* Pop up  window */
        .menu {
            color: var(--content-foreground-color);
            background-color: var(--content-background-color); /*#fefefe;*/
			display: flex;
            flex-direction: column;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40%;
            height: 70%;
            max-width: 800px;
            max-height: 800px;
            transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
            border: 1px solid #888;
			min-height: 450px;
			min-width: 400px;
			border-radius: 10px;
        }

        .popup-content {
            display: flex;
            flex-direction: column;
            flex: 1;
        }

        .menu-content {
            padding: 20px;
            grid-column-gap: 5px;
            justify-items: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
        }

        header {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            height: 60px;
            margin: 0 10px;
            border-bottom: 2px solid var(--border-color);
        }

        header h1 {
            text-align: center;
            grid-column-start: 2;
        }

        /* The Close Button */
        .close {
            color: var(--content-foreground-color);

            width: 40px;
            height: 40px;
            margin-left: auto;

            border: none;
            background-color: transparent;
            cursor: pointer;
        }

        .close img {
            filter: var(--icon-filter);
            width: 20px;
            opacity: 0.5;
            transition: 0.2s;
        }

        .close:hover img {
            opacity: 1;
            transition: 0.2s;
        }

        .createLayout {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
        }

        #createButton {
            grid-column-start: 2;
            display: inline-block;
            background-color: var(--content-foreground-color);

            border: none;
            color: var(--content-background-color);
            cursor: pointer;
			text-align: center;
			width: 140px;
			padding: 5px 0;
			border-radius: 10px;
        }

		#loadingWheel {
			width: 20px;
			object-fit: contain;
            margin-left: auto;
		}

        form {
            display: flex;
            flex-direction: column;
            align-items: stretch;

            flex: 1;
        }

        label, input {
            font-size: 2vh;
        }

        label {
            text-align: left;
            margin-bottom: 20px;
        }

        input {
            color: var(--content-foreground-color);
            width: 100%;
            border: 2px solid var(--border-color);
            border-radius: 5px;
            background-color: var(--content-background-color);
            box-sizing: border-box;
        }
    </style>

    <!-- The Modal -->
    <div id="popup" class="popup">
        <div class="menu">
            <header>

                <h1> Creation Menu </h1>
                <button class="close"><img id="dismiss" src="../../public/resources/xIcon.png" /></button>
            </header>
            <!-- Modal content -->
            <div class="menu-content">
                <div class="popup-content"></div>
                <div class="createLayout">
                    <img id="loadingWheel" style="display: none;" src="../public/resources/loading.gif"/>
                    <div id="createButton">Create</div>
                </div>
            </div>
        </div>
    </div>
`;

/**
 * Class that creates a creation Menu
 */
export class CreationMenu extends HTMLElement {

	/**
	 * Constructor for CreationMenu
	 * @param {String} kind the kind of log to make menu for
	 */
	constructor (kind) {
		super();
		this.attachShadow({mode: "open"});
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.startPicker = null;
		this.endPicker = null;
        this.popup = this.shadowRoot.getElementById("popup");
		this.content = this.shadowRoot.querySelector(".popup-content");
        this.heading = this.shadowRoot.querySelector("header h1");

        this.kind = kind;

		this.setKind(kind);
        // Get the <span> element that closes the popup
		this.closeButton = this.shadowRoot.querySelectorAll(".close")[0];

        this.create = this.shadowRoot.getElementById("createButton");
        this.loadingWheel = this.shadowRoot.getElementById("loadingWheel");
	}

    connectedCallback () {
		this.closeButton.addEventListener("click", () => {
			this.hide();
		});

        this.create.addEventListener("click", () => {
            this.loadingWheel.style.display = "inline";
        })
        this.create.addEventListener("click", () => {
			if (this.kind === "futureLog") {
                this.createFutureLog();
			} else if (this.kind === "monthlyLog") {
				this.createMonthlyLog();
			} else if (this.kind === "collection") {
                this.createCollection();
			} else if (this.kind === "tracker") {
                this.createTracker();
			}
		})
    }

	/**
	 * Show the menu
	 */
	show() {
		this.popup.style.display = "block";
	}

    hide() {
        this.loadingWheel.style.display = "none";
        this.popup.style.display = "none";
    }


	/**
	 * set the kind of menu to a passed in kind
	 * @param {String} kind the replacement kind
	 */
	setKind (kind) {
        this.kind = kind;
		if (kind === "futureLog") {
			this.content.innerHTML = futureLogCreator;
			if (this.startPicker !== null && this.endPicker !== null) {
				/* eslint-disable */
				this.startPicker.remove();
				this.endPicker.remove();
				/* eslint-disable */
			}
			this.startPicker = datepicker(this.shadowRoot.getElementById("futureFrom"), {id: 1});
			this.endPicker = datepicker(this.shadowRoot.getElementById("futureTo"), {id: 1});
		} else if (kind === "monthlyLog") {
			this.content.innerHTML = monthlyLogCreator;
			if (this.startPicker !== null && this.endPicker !== null) {
				/* eslint-disable */
				this.startPicker.remove();
				this.endPicker.remove();
				/* eslint-disable */
			}
			this.startPicker = datepicker(this.shadowRoot.getElementById("monthlyFrom"), {id: 1, onSelect: (instance, date) => {
				if (new Date(this.shadowRoot.getElementById("monthlyTo").value).getMonth() !== date.getMonth() && instance.getRange().end) {
					this.shadowRoot.getElementById("monthlyTo").value = "";
					this.endPicker.setDate();
					alert("Your start and end date must me on the same month");
				}
				this.startPicker.hide();
			}});
			this.endPicker = datepicker(this.shadowRoot.getElementById("monthlyTo"), {id: 1, onSelect: (instance, date) => {
				if (new Date(this.shadowRoot.getElementById("monthlyFrom").value).getMonth() !== date.getMonth() && instance.getRange().end) {
					this.shadowRoot.getElementById("monthlyFrom").value = "";
					this.startPicker.setDate();
					alert("Your start and end date must me on the same month");
				}
				this.endPicker.hide();
			}});
		} else if (kind === "dailyLog") {
			this.content.innerHTML = dailyLogCreator;
			if (this.startPicker !== null && this.endPicker !== null) {
				this.startPicker.remove();
				this.endPicker.remove();
			}
			this.startPicker = datepicker(this.shadowRoot.getElementById("daily"), {id: 1});
		} else if (kind === "collection") {
			this.content.innerHTML = collectionCreator;
		} else if (kind === "tracker") {
			this.content.innerHTML = trackerCreator;
		}

        this.heading.textContent = this.content.querySelector("form").getAttribute("title");
	}

    createFutureLog () {
        let start = new Date(this.shadowRoot.getElementById("futureFrom").value);
        let end = new Date(this.shadowRoot.getElementById("futureTo").value);
		if (start && end){
			localStorage.createFutureLog(start, end, [], [], true, (err, futureLog) => {
				if (err) {
					console.log(err);
				} else if (futureLog) {
					localStorage.readUser((error, user) => {
						if(error){
							console.log(error);
						} else {
							let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
							let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
							let contentWrapper = document.getElementById("contentWrapper");
							let futureLogStart = new Date(futureLog.startDate);
							let futureLogEnd = new Date(futureLog.endDate);
							let dropdown = new DropdownBlock(`Future Log ${monthNames[futureLogStart.getMonth()]} ${futureLogStart.getFullYear()} - ${monthNames[futureLogEnd.getMonth()]} ${futureLogEnd.getFullYear()}`, futureLog, 1);
							contentWrapper.insertBefore(dropdown, contentWrapper.lastChild);

							if (contentWrapper.childNodes.length >= 1) {
								dropdown.titleWrapper.classList.add("singleItemWrapper");
							}

							for (let j = 0; j < futureLog.months.length; j++) {
								let currentMonth = user.monthlyLogs.filter((month) => month.id === futureLog.months[j].monthlyLog)[0];
								let dropdownMonth = new DropdownBlock(`${monthNames[new Date(currentMonth.date).getMonth()]} ${new Date(currentMonth.date).getFullYear()}`, currentMonth, 2);
								dropdown.contentWrapper.appendChild(dropdownMonth);
								for (let k = 0; k < currentMonth.days.length; k++) {
									let currentDay = user.dailyLogs.filter((day) => day.id === currentMonth.days[k].dailyLog)[0];
									let dropdownDay = new DropdownBlock(`${weekDays[new Date(currentDay.date).getDay()]}, ${monthNames[new Date(currentDay.date).getMonth()]} ${new Date(currentDay.date).getUTCDate()}`, currentDay, 3);
									dropdownMonth.contentWrapper.appendChild(dropdownDay);
								}
							}
							this.hide();
							dropdown.scrollIntoView({behavior: "smooth"});
						}
					});
				}
			});
		} else {
			alert("You must pick a start and end date!")
			this.loadingWheel.style.display = "none";
		}
    }

	createMonthlyLog () {
		let start = new Date(this.shadowRoot.getElementById("monthlyFrom").value);
        let end = new Date(this.shadowRoot.getElementById("monthlyTo").value);
		console.log(new Date(currentObject.startdate) > end || new Date(currentObject.endDate) < start);
		if ((new Date(currentObject.startDate) > end || new Date(currentObject.endDate) < start) && start !== null && end !== null) {
			console.log(start);
			console.log(end);
			localStorage.createMonthlyLog(currentObject.id, [], [], start, end, true, (err, monthlyLog) => {
				if (err) {
					console.log(err);
				} else if (monthlyLog) {
					localStorage.readUser((error, user) => {
						if (error) {
							console.log(error);
						} else {
							let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
							let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
							let contentWrapper = document.getElementById("contentWrapper");
							let currentMonth = monthlyLog;
							let dropdownMonth = new DropdownBlock(`${monthNames[new Date(currentMonth.date).getMonth()]} ${new Date(currentMonth.date).getFullYear()}`, currentMonth, 1);
							contentWrapper.insertBefore(dropdownMonth, contentWrapper.lastChild);
							if (contentWrapper.childNodes.length >= 1) {
								dropdownMonth.titleWrapper.classList.add("singleItemWrapper");
							}
							if (new Date(currentObject.startDate) > end) {
								currentObject.startDate = start.toDateString();
								currentObject.months.splice(0, 0, {id: monthlyLog.id, content: [], monthlyLog: monthlyLog.id});
							} else {
								currentObject.endDate = end.toDateString();
								currentObject.months.push({id: monthlyLog.id, content: [], monthlyLog: monthlyLog.id});
							}
							localStorage.updateFutureLog(currentObject, true, (res) => {
								if (res.ok) {
									createEditor(dropdownMonth.contentWrapper, currentObject, currentMonth.id, (resp) => {
										if (resp) {
											for (let k = 0; k < currentMonth.days.length; k++) {
												let currentDay = user.dailyLogs.filter((day) => day.id === currentMonth.days[k].dailyLog)[0];
												let dropdownDay = new DropdownBlock(`${weekDays[new Date(currentDay.date).getDay()]}, ${monthNames[new Date(currentDay.date).getMonth()]} ${new Date(currentDay.date).getUTCDate()}`, currentDay, 2);
												dropdownMonth.contentWrapper.appendChild(dropdownDay);
												createEditor(dropdownDay.contentWrapper, currentMonth, currentDay.id, () => {});
											}
											this.hide();
											dropdown.scrollIntoView({behavior: "smooth"});
										}
									});
								} else {
									console.log(errors);
								}
							})
						}
					});
				}
			});
		} else if (!start || !end) {
			alert("You must pick a start and end date!")
			this.loadingWheel.style.display = "none";
		} else {
			alert("You already have these months in your Future Log, please delete them before creating them again");
			this.loadingWheel.style.display = "none";
		}
	}

    createCollection() {
        let title = this.shadowRoot.getElementById("collection-title").value;

        localStorage.createCollection(title, currentObject.id, [], 1, (err, collection) => {
            if (err) {
                console.log(err);
            } else {
                console.log(collection);
                let dropdown = new DropdownBlock(collection.title, collection, 1);
                contentWrapper.insertBefore(dropdown, contentWrapper.lastChild);
                this.hide();
                dropdown.scrollIntoView({behavior: "smooth"});
            }
        });
    }

    createTracker() {
        let title = this.shadowRoot.getElementById("tracker-title").value;

        localStorage.createTracker(title, [], currentObject.id, 1, (err, tracker) => {
            if (err) {
                console.log(err);
            } else {
                this.hide();
                // dropwdown.scrollIntoView({behavior: "smooth"});
            }
        });
    }
}

window.customElements.define("creation-menu", CreationMenu);