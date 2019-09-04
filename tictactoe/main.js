$(function () {
  // set variables for table message box and turn to tell user
  var player = 1;
  var table = $('table');
  var messages = $('.messages');
  var turn = $('.turn');

  // attatch event listener to table columns
  $("body")
    .on("click", "td", mark);

  function mark() {
    td = $(this);
    // state of the column (cross or circle or empty)
    var state = getState(td);
    // if empty
    if (!state) {
      // define cross or circle
      var pattern = definePatternForCurrentPlayer(player);
      changeState(td, pattern);

      // check if player wins or tie or nothing
      if (checkIfPlayerWon(table, pattern) == 1) {
        var messageTxt = 'Error!';
        messages.html(messageTxt);
        turn.html('');
        $("body").off("click", "td", mark);
        return;
      } else if (checkIfPlayerWon(table, pattern) == -1) {
        var messageTxt = "It's a DRAW!";
        $('.messages').html(messageTxt);
        $('.turn').html('');
        $("body").off("click", "td", mark);
        return;
      } else {
        messages.html('');
      }
      // computer moves
      player = setNextPlayer("computer");
      pattern = "circle";
      computerTurn(table, pattern);
      // check if computer wins
      if (checkIfPlayerWon(table, pattern) == 1) {
        var messageTxt = 'Computer WON!';
        messages.html(messageTxt);
        turn.html('');
        $("body").off("click", "td", mark);
        return;
      }

    } else {
      messages.html('This box is already checked.');
    }
  };


});

function getState(td) {
  if (td.hasClass('cross') || td.hasClass('circle')) {
    return 1;
  } else {
    return 0;
  }
}

function changeState(td, pattern) {
  return td.addClass(pattern);
}

function definePatternForCurrentPlayer(player) {
  if (player == 1) {
    return 'cross';
  } else {
    return 'circle';
  }
}

function setNextPlayer(player) {
  if (player == 1) {
    return player = "computer";
  } else {
    return player = 1;
  }
}




function checkIfPlayerWon(table, pattern) {
  var won = 0;
  if (table.find('.item1').hasClass(pattern) && table.find('.item2').hasClass(pattern) && table.find('.item3').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item1').hasClass(pattern) && table.find('.item4').hasClass(pattern) && table.find('.item7').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item1').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item4').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item6').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item7').hasClass(pattern) && table.find('.item8').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item2').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item8').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item3').hasClass(pattern) && table.find('.item6').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item3').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item7').hasClass(pattern)) {
    won = 1;
  } else { // CHECKS FOR TIE GAME IF ALL CELLS ARE FILLED
    if ((table.find('.item1').hasClass('cross') || table.find('.item1').hasClass('circle')) && (table.find('.item4').hasClass('cross') || table.find('.item4').hasClass('circle')) && (table.find('.item7').hasClass('cross') || table.find('.item7').hasClass('circle')) && (table.find('.item2').hasClass('cross') || table.find('.item2').hasClass('circle')) && (table.find('.item5').hasClass('cross') || table.find('.item5').hasClass('circle')) && (table.find('.item8').hasClass('cross') || table.find('.item8').hasClass('circle')) && (table.find('.item3').hasClass('cross') || table.find('.item3').hasClass('circle')) && (table.find('.item6').hasClass('cross') || table.find('.item6').hasClass('circle')) && (table.find('.item9').hasClass('cross') || table.find('.item9').hasClass('circle'))) {
      won = -1;
    }
  }
  return won;
}


function computerTurn(table, pattern) { //computer try to win at first, move
  if (!getState(table.find('.item1')) && ((table.find('.item3').hasClass('circle') && table.find('.item2').hasClass('circle')) || (table.find('.item9').hasClass('circle') && table.find('.item5').hasClass('circle')) || (table.find('.item7').hasClass('circle') && table.find('.item4').hasClass('circle')))) {
    changeState(table.find('.item1'), pattern);
  } else {
    if (!getState(table.find('.item2')) && ((table.find('.item1').hasClass('circle') && table.find('.item3').hasClass('circle')) || (table.find('.item8').hasClass('circle') && table.find('.item5').hasClass('circle')))) {
      changeState(table.find('.item2'), pattern);
    } else {
      if (!getState(table.find('.item3')) && ((table.find('.item1').hasClass('circle') && table.find('.item2').hasClass('circle')) || (table.find('.item7').hasClass('circle') && table.find('.item5').hasClass('circle')) || (table.find('.item9').hasClass('circle') && table.find('.item6').hasClass('circle')))) {
        changeState(table.find('.item3'), pattern);
      } else {
        if (!getState(table.find('.item4')) && ((table.find('.item6').hasClass('circle') && table.find('.item5').hasClass('circle')) || (table.find('.item1').hasClass('circle') && table.find('.item7').hasClass('circle')))) {
          changeState(table.find('.item4'), pattern);
        } else {
          if (!getState(table.find('.item7')) && ((table.find('.item9').hasClass('circle') && table.find('.item8').hasClass('circle')) || (table.find('.item3').hasClass('circle') && table.find('.item5').hasClass('circle')) || (table.find('.item1').hasClass('circle') && table.find('.item4').hasClass('circle')))) {
            changeState(table.find('.item7'), pattern);
          } else {
            if (!getState(table.find('.item8')) && ((table.find('.item9').hasClass('circle') && table.find('.item7').hasClass('circle')) || (table.find('.item2').hasClass('circle') && table.find('.item5').hasClass('circle')))) {
              changeState(table.find('.item8'), pattern);
            } else {
              if (!getState(table.find('.item9')) && ((table.find('.item7').hasClass('circle') && table.find('.item8').hasClass('circle')) || (table.find('.item1').hasClass('circle') && table.find('.item5').hasClass('circle')) || (table.find('.item3').hasClass('circle') && table.find('.item6').hasClass('circle')))) {
                changeState(table.find('.item9'), pattern);
              } else {
                if (!getState(table.find('.item6')) && ((table.find('.item3').hasClass('circle') && table.find('.item9').hasClass('circle')) || (table.find('.item5').hasClass('circle') && table.find('.item4').hasClass('circle')))) {
                  changeState(table.find('.item6'), pattern);
                } else {
                  if (!getState(table.find('.item5')) && ((table.find('.item3').hasClass('circle') && table.find('.item7').hasClass('circle')) || (table.find('.item9').hasClass('circle') && table.find('.item1').hasClass('circle')) || (table.find('.item6').hasClass('circle') && table.find('.item4').hasClass('circle')) || (table.find('.item8').hasClass('circle') && table.find('.item2').hasClass('circle')))) {
                    changeState(table.find('.item5'), pattern);
                  } else { //// computer MOVE at DETECTS IF THERE ARE TWO IN A ROW NEXT TO AN EMPTY CELL AND PLACES MOVE THERE
                    if (!getState(table.find('.item1')) && ((table.find('.item3').hasClass('cross') && table.find('.item2').hasClass('cross')) || (table.find('.item9').hasClass('cross') && table.find('.item5').hasClass('cross')) || (table.find('.item7').hasClass('cross') && table.find('.item4').hasClass('cross')))) {
                      changeState(table.find('.item1'), pattern);
                    } else {
                      if (!getState(table.find('.item2')) && ((table.find('.item1').hasClass('cross') && table.find('.item3').hasClass('cross')) || (table.find('.item8').hasClass('cross') && table.find('.item5').hasClass('cross')))) {
                        changeState(table.find('.item2'), pattern);
                      } else {
                        if (!getState(table.find('.item3')) && ((table.find('.item1').hasClass('cross') && table.find('.item2').hasClass('cross')) || (table.find('.item7').hasClass('cross') && table.find('.item5').hasClass('cross')) || (table.find('.item9').hasClass('cross') && table.find('.item6').hasClass('cross')))) {
                          changeState(table.find('.item3'), pattern);
                        } else {
                          if (!getState(table.find('.item4')) && ((table.find('.item6').hasClass('cross') && table.find('.item5').hasClass('cross')) || (table.find('.item1').hasClass('cross') && table.find('.item7').hasClass('cross')))) {
                            changeState(table.find('.item4'), pattern);

                          } else {
                            if (!getState(table.find('.item7')) && ((table.find('.item9').hasClass('cross') && table.find('.item8').hasClass('cross')) || (table.find('.item3').hasClass('cross') && table.find('.item5').hasClass('cross')) || (table.find('.item1').hasClass('cross') && table.find('.item4').hasClass('cross')))) {
                              changeState(table.find('.item7'), pattern);
                            } else {
                              if (!getState(table.find('.item8')) && ((table.find('.item9').hasClass('cross') && table.find('.item7').hasClass('cross')) || (table.find('.item2').hasClass('cross') && table.find('.item5').hasClass('cross')))) {
                                changeState(table.find('.item8'), pattern);
                              } else {
                                if (!getState(table.find('.item9')) && ((table.find('.item7').hasClass('cross') && table.find('.item8').hasClass('cross')) || (table.find('.item1').hasClass('cross') && table.find('.item5').hasClass('cross')) || (table.find('.item3').hasClass('cross') && table.find('.item6').hasClass('cross')))) {
                                  changeState(table.find('.item9'), pattern);
                                } else {
                                  if (!getState(table.find('.item6')) && ((table.find('.item3').hasClass('cross') && table.find('.item9').hasClass('cross')) || (table.find('.item5').hasClass('cross') && table.find('.item4').hasClass('cross')))) {
                                    changeState(table.find('.item6'), pattern);
                                  } else {
                                    if (!getState(table.find('.item5')) && ((table.find('.item3').hasClass('cross') && table.find('.item7').hasClass('cross')) || (table.find('.item9').hasClass('cross') && table.find('.item1').hasClass('cross')) || (table.find('.item6').hasClass('cross') && table.find('.item4').hasClass('cross')) || (table.find('.item8').hasClass('cross') && table.find('.item2').hasClass('cross')))) {
                                      changeState(table.find('.item5'), pattern);
                                    } else { //set at the defensive corner
                                      if (!getState(table.find('.item1')) && ((table.find('.item5').hasClass('cross') && table.find('.item9').hasClass('circle')) || (table.find('.item9').hasClass('cross') && table.find('.item5').hasClass('circle')))) {
                                        changeState(table.find('.item1'), pattern);
                                      } else {
                                        if (!getState(table.find('.item3')) && ((table.find('.item5').hasClass('cross') && table.find('.item7').hasClass('circle')) || (table.find('.item7').hasClass('cross') && table.find('.item5').hasClass('circle')))) {
                                          changeState(table.find('.item3'), pattern);
                                        } else {
                                          if (!getState(table.find('.item7')) && ((table.find('.item5').hasClass('cross') && table.find('.item3').hasClass('circle')) || (table.find('.item3').hasClass('cross') && table.find('.item5').hasClass('circle')))) {
                                            changeState(table.find('.item7'), pattern);
                                          } else {
                                            if (!getState(table.find('.item9')) && ((table.find('.item5').hasClass('cross') && table.find('.item1').hasClass('circle')) || (table.find('.item1').hasClass('cross') && table.find('.item5').hasClass('circle')))) {
                                              changeState(table.find('.item9'), pattern);
                                            } else {
                                              if (!getState(table.find('.item2')) && ((table.find('.item1').hasClass('cross') && table.find('.item5').hasClass('circle') && table.find('.item9').hasClass('cross')) || (table.find('.item3').hasClass('cross') && table.find('.item5').hasClass('circle') && table.find('.item7').hasClass('cross')))) {
                                                changeState(table.find('.item2'), pattern);
                                              } else {
                                                if (!getState(table.find('.item1')) && ((table.find('.item2').hasClass('cross') && table.find('.item4').hasClass('cross')))) {
                                                  changeState(table.find('.item1'), pattern);
                                                } else {
                                                  if (!getState(table.find('.item3')) && ((table.find('.item2').hasClass('cross') && table.find('.item6').hasClass('cross')))) {
                                                    changeState(table.find('.item3'), pattern);
                                                  } else {
                                                    if (!getState(table.find('.item7')) && ((table.find('.item4').hasClass('cross') && table.find('.item8').hasClass('cross')))) {
                                                      changeState(table.find('.item7'), pattern);
                                                    } else {
                                                      if (!getState(table.find('.item9')) && ((table.find('.item6').hasClass('cross') && table.find('.item8').hasClass('cross')))) {
                                                        changeState(table.find('.item9'), pattern);
                                                      } else { // IF NO OPPotion to win or defend, THEN PLAY IN ONE OF THESE SQUARES
                                                        if (!getState(table.find('.item5'))) {
                                                          changeState(table.find('.item5'), pattern);
                                                        } else {
                                                          if (!getState(table.find('.item1'))) {
                                                            changeState(table.find('.item1'), pattern);

                                                          } else {
                                                            if (!getState(table.find('.item3'))) {
                                                              changeState(table.find('.item3'), pattern);

                                                            } else {
                                                              if (!getState(table.find('.item7'))) {
                                                                changeState(table.find('.item7'), pattern);

                                                              } else {
                                                                if (!getState(table.find('.item9'))) {
                                                                  changeState(table.find('.item9'), pattern);

                                                                } else {
                                                                  if (!getState(table.find('.item2'))) {
                                                                    changeState(table.find('.item2'), pattern);

                                                                  } else {
                                                                    if (!getState(table.find('.item4'))) {
                                                                      changeState(table.find('.item4'), pattern);

                                                                    } else {
                                                                      if (!getState(table.find('.item6'))) {
                                                                        changeState(table.find('.item6'), pattern);

                                                                      } else {
                                                                        if (!getState(table.find('.item8'))) {
                                                                          changeState(table.find('.item8'), pattern);
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }

                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}