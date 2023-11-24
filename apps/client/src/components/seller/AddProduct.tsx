import { useParams ,useNavigate} from "react-router-dom";
import BackButton from "../../assets/svg/BackButton.svg";
import BidButton from '../../assets/svg/BidButton.svg';
import mongoose from "mongoose";
import { constSelector, useRecoilState } from "recoil";
import { imageState, singleProductDataState, userData } from "../../data/ComponentData";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {activeListItemstate, cameraOpenState} from '../../data/RelatedStates';

const imageLink2 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFhYZGRgaHBwcHBwcGhocGh4cIRgaGhoaHBgcIS4lHB4rIRoaJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjYsJSw0NDQxNDQ0NDQ0NDQ0NjQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgABB//EAD0QAAIBAgUBBQYFAwIGAwEAAAECEQADBAUSITFBBiJRYXETMoGRobFCwdHh8AcUUmLxFSNTgpKiM7LSFv/EABoBAAMBAQEBAAAAAAAAAAAAAAECAwQABQb/xAAnEQACAgICAgICAgMBAAAAAAAAAQIRAyESMUFRBBMiYTJxkaHwM//aAAwDAQACEQMRAD8A+Z2ea1+A2RRPTisjY5p/bDFQw2AFTzK0JHQzbGFRHFF4bMTFIUfca6m4MbHYdKzuCKqTNRZxII32oi64K8xWXwdx32njpTQXSB3gdv5NTlGmUjK0QxF51YdaZEal32PhxQuHuI+56V7iH1HuvFKw6Wz21i4Jk8eYoHFYtyZHFENg0Ve88k+FLTaJ90mPLmuUY3ZOTl0K8ZceaGDkiTRi2Wd9PejxImoNh21FBAjqdprSq6M0k+yuwpaFnk9IMVp8f2cexZR0V9TGCfEGYICiRt4ms/hkKT0J5prhc4dBGtyv+Ib6iaKaToWSbVim1mb2TCsUZehAP0Iogm6QHcOA2/Uah160sv3oulwWIme/3jz1mmWKxb3kBBLaRAWAIHlFGUaBG2QwuKAfetBlmLJYVmcNhXbePp960GSYe4CdQFRyJF8TldGguYoAwf58KTYnAvceWaF+IpwmCDbmJFFJgWkE8c1KLa6NDipdlY7PoiKU58aboYUBlkgUK+KI2FE2sVtxJpk0FKjmuqGAiKIZ9ew2pXicQrnSTBmmWWoqrzPnRjt0KzrVuCQTxXptA+823SKniEBMzSTN81SyNMU7VHN+WOC4GxO3SkGa4MGYUEngjmhsuzc4htIGwp7hcGFOoyTStNs5U0ZvCYS4lxNY7vINaXFX0VSSOlEXWEbjalGZJ3NjsaWWhVGugazj0aTO6/ajkxYYAAiKTYPBBJlpmvUsujGBK9KGgJvyab+6VYU9aExTsrQDsaQvYu3D7/d6T0rR4fDM2megg1S7CnZEXwPxCuom5lyknuiuruLGPhFg70yRyF2MCllvmmPtIWCJ5rXIzove4Nt6s9oBO9LSNqnatEiaVxR1jfAExsTv4Uc99lHiKEw0bKP54VoBhl098CPD+eNZ5tJ7Kxi2tGexeJgSGB9NqpXHbdadPkFlwdLEE8Ang+HpSfE5U6CTuBzHhTRlF6BJSQZgMXrI1cUdcxNsMANj4DrSzCsqLuOahiXVt02NK4JyFcmkaO3fUnuAA+fXaaBuqjuS3vTHG3wpHgXuFtm+NPhYZgBtO29K8fF9gU+RHF5G1xQ6gkLvA3NX9l8BYdy18lQp7oI2bkEH4xTfDX3Q6FPK/OvcfmjFAHVdv8RVI6QJLf6Bu1GR4diDaQyRyNh6mfypThcme2u7rB8jNNTfLhWG6j5ij0uqfUeNDJOwQhTdAOCwJQCVU+Y8KPw95d9KwaimObWFFuB1J4pjdwSMpYgSeoNT4p7Roi9A+D1KZYCD86IOYQSCKqwLKogtPrQGKRncn3U8jzXJUuwuQQ76wSpihsBjO8UJ70xQ6M6uEXcedeNYW25uOd+g86CiBt9oc3suTdnO5qzDwigAmKWNj9anVweKGw2NuK8CCg+dHyHkjRjEkbUJcspdlXWYPhUL2K1oSFIYdKpGcaFAZSGPjRt2daGuFwtpPdUKatvORxWdvZq+wPXivcM90nvnunpXOQE1dDLE3QVk0qu4tAhlpnigsfjSGKE6Z4NCY3Ln0Aq243260qjvZ0pei93BUMzbmr8DbvK8hpWgsEyEQ3PUHaicLmio5Wdq7i+hE0uzSYdR13okYmDA2pSmZLEircNiQ5MmDRWitphrY2vaCNxK6u5MNI+NWxTW3aZvdHFKkNNsPiim46xWyd+DIqDkwIIAOzVdhsCijvGl7YpmYEn0qtcWdRVvH/aoOMmuxk0aSzYQEMIgb1DG32fg+XqKVWmYKe9uajhrr6jvtzNS4PuyrmqoJbGsh3B/Kp2syFwFZgniSYmqsSFfbUPGqsNhVQzqB8KZca32Jbv9DO6F9kAw+I6VHKsqRwZafSo3bhkDTII38IonB4xbUKgkE0OUq0dJrlvonh8kAciYHTxo25hmQgATvua7E4jUykQu446U/v4YBF0HVtJ+4poqUlfYjcYuhpkeXLoLsoJI29KAu5FZZHLuUOomQQI8oPSnOSo+gatl6DyojF5bbuqVcT/JrbFLitEMi5WYG0FtuyoNYbr5xxxxtVVllLFXbQ88H6VqcBlLJ7wAIJjzEmN/Shs2yQX5JAB6Go5YWraGwJpUv9nmAy2V3JaflTPE2QiRpqrLbb2UCMZ86MuvqG5qUUkjVvwZr+zd30hon6UTmOBuaNKxPjRqXUJmd6rvYlxsAY8xQaQE9bM7l+Hv22LONVXW8vOJfU50qOPH9qsc3WcgmFPTyqrN7jYdNaHbqDQXYuuP6LM7tpYRQDqms5gMwZXOn3fOgM3zZr4EgrVmV48IO8swKq4+aM6yrlpm0sY9WTVtPhUBiEuKNcAqfKsthcxd2J0Qk8jpUcbrZu4GYeQ/OpuFOi/3atbH2YFdalXWBxQmK7SC3s4242pKrowCsSHB4mqsfZRlhp2rlBXsDytq0TuXhfcMrEifgK2uXMgUDUCQIO9ZXs9ibKdxRM8k/rV+LdEYm2TNdJW6/wABjk4q20ajG5Ml5QUhWB5HXypbm/Y+RrtuVbqOR/vQmC7Ti0Bq4mtVl+cLeEqNvGgriN+GRGabIHVFGvnmiDkzgDS+9O80QlZWkV8XNBILBxzyQaVy2NxSJLgL3V1+VdSxcXcP4Wrq6mdZgEoyJ2oMUXbeN61yM6OhhII24npUdRkz4ftRHty27CVP82qu7bBpE/ZzIJdI3HyqxbhJ3JiuOFIHIqsCTQbTOthS3Z2AP3qaI4Mxt/OlRs3o4gVeyF4gmZqLdMarLmYzAbkSDO3mKKtrCSCJB/gpVdw7JDEgj1+e1FYZkgQTv967xoW90xvl+J1sVNbTs9hlVCGeZPHhP3rD4DFqhGoAn0rR2cehKkH4CjCXGV0NxTR9Fw9rSsdK9w2FC1XgMQrW1YERHNEYe+riVMivQQiSBMzwguLGoqdoKmD+9LMTaNuO/PrTXHWgY6EGQf3pFnQKnYkmp5f4nRdSsvS6GG9Z3tN2hSx1BMbCQCfMDw8/p1qrPM4/t7DXG591F8WP5Csp2VyB8e5xGIYlC3G/ej8ulShFVb6NKuWkDv29vMYRB5QbhP8A6kfam2G7VYhkV2DohYK2pdQkgkFSfSvoOCyqxaEJaUf9omvM0yq3fttbZYDeXXxqnJegPHfkzK472glGBfqIKyOsA9fKleJW9ckOp0g0qx7vhH0Me9bYQ3Up0n+dI61tsBfF9AwiCAf4ahljxqSFcb1ZiLzo0qdiK8w9hWME09v5ErXGC7nmkl3K2R95EeFcpKuzPJOPaK80drI0oRB5p3kOYj2cKoJjekub5Ye4EJaaWpiXw7QNiORT8OUUrEi+E76sa4jKtbtc4MzFdmlrVBBEgbila53dn8q58ezySIpVjmmrDLLFXR7YsXFMqB505aCmsxxvWZt4l2MKST86uvK6sofUFnenlBt7BGSfaHNuys6tOoeG1aV77rbDosCOBWGxmNCsBbaFFaTs9nie47FiehqUoSqy2KUba6J4TtKz6kYcb05yvFs6NMCePT0rNZzirZeFXcmisMEGkMSg2DbwPpU5Jd0UUmntmoSxt7y15XtvDWIEP9a6p/kWPjMVcjVWRXVssyE/akcVJbkiKiIqMRXaOCFJMdRUH2NeC5XF5pKOLVairFwTQINWrU5IdMZKpcR59eY9aPfCroHSN5pLacg7U0w+K0oZ6g/CpSTXQ0a3ZK2mowCJ5HmK7DKUxAHiOOnFLsNf7wB4MgeVHYYtrQn8Jj4VZKhbQ7sZ7dBe2rQnXr8j0rRdmc5Z7QhodTBB4jpt6Vnsuyg3C6K0Fyd/Ctdhsmt4e2AG7wHJ61eLuNrwSSlGW+qY1bPrI0q7Q56QefhwKhi7lt1VWYyx7oAEkT4nxpVZdGmQCwpviLOhQQQp0xrMEjbcqvn47bV32NotjhGT2fN/6hYZLjJGI0qgb/ltacOoAJL8gMux3HlzIrHrnmJVFt27z2bagBVVirHzZk7xJmfCvoP9Q8UbmA1Jd9oi31VzC6gV1Bu8u0BtAIjaRzXze3d0uARtI6TAMbgddulasKjKKYuVuDaQ5ybtli7DDXdN63+IMdTAf5KxGqR4GQfrX0vJMRibvfF+1oCB2VkLaQRqGp1aFkbiRuK+L+xO8+B/atR2Ext4XAqM4UoiNp3On2jlZ22WBpJEEDrXZIR7Ox5G9Df+qODC+zxSEFbgNtx5EFlM/A/Sof00zWbb2n5tnu+Ok9Pgaa/1QuacLhkEk+21HqYCOGMjzYfSsP2OxJTGeVwH47Ej6ioyjyxsq9SPpqW/Zu9wmQ30pfjbeuXUgz0onGYsshDLHnSHF3HUakNYoqwyqqZbdsO6BhsV4rO4nAOboLiRO/6U9xWMdUE7GliZyrmG2NVjKS6M+VRbSfYDmGDcOGCbR0qtXV1jTBEzTu1jp93vD0mjcNl1pgXiDMx+1c8rqpIVQTdoR9nsD/zNSCYPWtZnNu2UVboAmg3zKzbBiFpJfzlMQ+lmJA45+dTblJ8ilxjGl2LM0yhVn2Z1Dy3oXBYEqwLEj0rQJbawS4GtW461C3ikJJ07+B/eq/Y6rszpe3R69i0rq2ozzJo67lRvw5fSvl1FLBmVs6vaINvdHjXmEzNGRmYlfBak4y7LRlF9j7+wA2BG1dSG3j5Aia6hUivJGXrq6uq5I8rq6uonHtSBqAqa0rOJrVy1Soq5aSQyLEotLm2kjahAKItHipSHQR/akldIkMNvXwpngMsdxvKsN9+sV2FKqvPEU3w+YwoIgxINT+1lFjQZk2HKsHMr5im2LuSSTJmlOGzYGFIjrRdzFCJMRVYTdUTlFMpxmLs2Atxy/vAEKASep2JGwA+1MM3z3DnDNeKpetlC51AMG/0FW2mdoPUUi7RZZavWbdwXriAqROgOmqRrBAIIPAmTsBWKvYJgFse3L2nupsFZRuSXciCSAqydiBE1pi4SpJ786HxY5xTbWqs3PZ/N0zPDX7LW1WDpKD3Qjd5CIAg6kbjiAaxGP7M30fRbQ3VnukMuuPBhtJ/m3FavsLh0sti0t7wyLrBDKVCloUjadTH5Dwp57Dvg9QQaEszxTaj1+yqxxyR/LswGX9lsRcuaL6PaQbvxqI8J4HyMfbXdlMEq3rhRCiFoRCD3UDsw533LnboIFaPtBcUWSzbamReu/wCIjbyWgcJi0P8A8S7gbsRt+9Jlzyk+Nj4cEYxtIx/9VM6IvrYQqdNsh9gYLkEAf4tpUH0YVl+yuMVL6BxsGBB6qePiPKk2JxDXHd3JZnYsSeSSZ3rSdnsntOFul9QBEpABB8CZ8fnWtpQx0zM23Kz6gwBWOZ+tJr+E306TEz9algccpdU1bb7+pJ5p86LpJVpNee209DakZTtS6IiuJnwrEX21ywEV9Jx+HS+mhhSXG9l0VIQmTVcWWK77M2XHKVtGZy7HNZG0EHxoixnTF4/Ca7M8ke2uomfSk7WmG4kVeoy2Z05RdMLzPFe0MBYj60Hadk3iqyGma9vs0gmmUUlQLbfZtMkzFXVVfYedHXsLYE6up2O9Y+xmWjQB0FQxGZMxABiDMVD6ny10VvW/AVnOUFXlCSnO9Ncle1C27iSTx1/KpYfHm6qal4ME0wOAZSr2wNvGhJtrixsSfK10Nxldrov0rqC/4liP+mflXlR4v2aecfX+j5pXV1dWhkDw11ca8miceiprVc1YhoM4mpq1agIqxRU2FFq1ahqCLVgFSZVF9pvGmIMAaTIpajirrMnccbCkcbG6GSOGjeDRmHJIAaImd+InrSYSpHXn9603ZqyL7MPZs6hNvfCa9QhXZeARq2PMUY62LXKSR88zV7z3HM3iuptJIde7Jg6dgu0bULYxL2gH0gkMdnXUrAoVKsp5BDMPjX2zHYBVVQiW0aN1hQD4iYrP4jsgcY9s3LqhUYm4qCCF4Cq3VjsCx4jYVXF82MpcWqRsfx3GDabYN/TtXezdukQrXCSwSE2CjSoGwAkADoBWga8A0QT9PjA/WtVhcPas2xh7SBLarpCjjfkzyTJkk7k71nb+CgzsN4M+sfnWb5k3yuL0U+NFb5IlmoFzCsxXdCpWCdpdVb17pNLMvfoNuCeu4IJBnoePjWjsWVa0yqQdSmCOJB49ZA+dAZdgByVgdSazylKlvtGiHFKV+zI3+woxF931wpBgBDsx6swPnPy5oqz/AE8uorC37NdRlmZzJA4UHTstbxHVRsAB06TQt7EgtG7HoOFHwHPxrTH5UoxUZOzLk+MsjdaMji8oxFhO/ZlQPfUh1HqRx8YqrCY3SsFua+i2L5Aho35AG3pFfOu3OShLwa1sjqHCjYKZIIHltPxrRHjNaMU8TxuxRfzO4t0ie7P0ol891nSm8Uk9k7SG8KCsoUnvRVViiRnyXRolx0yHE+v70lvXSs+ZMVHMMcCojmKpwt7UhBEtPNPGFKyUot15I3ye7PFV3HVm36cVPE4kkaW6UKRMeNOkdGK8oZYDJXvd4bDoTXXcgdXVSed6Lw1+4iATA+FEG+50t4cfvSym10FRttsuS1oWHIEdKeW7h9mjDdeYFInKsddwTFEXu0ShO4sbcVCUZS6OjJRfZo/+PL/j9K6sF/8A0TdVHyrqH0yH+9iGpV5Xoq7OINUKsaoLXIDOFWhaqNTD1zQEy7TU0qCGauSKRoZMKtNtUa5G6VcFEAdai1TKp2V6q9W+QRv4V2neKuTAM59SBXKvIXfgMXGhCrRIG/rIO31rW5DZKYIEO49o5aAIAAWAAeszP+1JMq7N/wBxpBbSpME88VvcS2lEto4YIqqNSgmFAWeIHFRzNLG17L4It5E/RmbuBltyzeZJP50+yTDKhAAgtHyDBj9qAxOY76VAJ6mIHPIFM8ptktqLGVRv/IxH0msONNySR6cnUHYxa5uTPWfrSDM9eskLtJgyT9+KeOhhQBuQCT0E8STXYnDjckiPCnnGTROEoxYPkGJ1BkfcxtI+Y/P4VPFXwsKNh/JNB4XEILoCE6hz/j8T1rsQ2vEFI90amjgbiJPnFByfBR8jKK5t+KssCux7o9CeAPADqaOtYcWxJ97xNe2SeJgcAAVXjru+gbkc/egkkrFcm3R6jktWV7d3yL6KD7ttZ+LMftFarAr/ADy5J+U1hu37F8SFUHe2h9B3vyit/wANXdmP5T6EK3pc0pvRqZuk0U1kq0z5GhTbLPp6Gt6SMb2D4tgy6ulE4K8q2yRzVWOsKiEKeteYNBAB61Sk4ktqSR5iIbfrV2UohuS3ShMQ0MY4r3LbqqxJpXG4jeTd28PaKyxgdN6RZrotsAjSDS7FY4sBDHT4f70sv4kuwPAqGPDJO2zpyS0NGxLEHegrmKbwmatdwVG0UNcMCqxQjZDUa6o+1PhXtUr9A5RPK6uFe1FjnhFVrVwFV21kxXIBC5XJzUHeSa8XkVTjoUPtWSxjipMNDaIo7CYY6hvsRzQmdW9FwGZmpJ26KdBWgquodK9ty3ePNTbEqqCTM0zyzK3dQygEc/71GVlPItWwS2xpqisgEiON/wA6rS3DwwiDWmvYaU4B25qUvFlEhp2YtlbJdeQDE9CSN/vUM0vaWcDrx6dKb5daVbEEwABJ4Gw6nwrN5qpDkEyOh8QdxUPlQaS9Gv4rTteQaxzTfDZitsjUffYR8GUx8hPwpClwA7nahMRiCzop51yB4ACAPlNZsafK0bpxuOzZnNEuuO9pCk7beIIPPEbGJ4FUY/NNLaRuCOnn+1Zp7ZDEimT25CMf8RPqBH5VbLLjtdsz4o8u+kM8DfXWJgDx8DTnFXUQq3d77aTsJLQSJPXZTWUspraB/PGp5nmI0ELutsCD43C6hI8fxVCMntey8oK0ao4qJ7oAAmfHyFLUaW35O59TV2JujSo6aQzfHgfzxoPDXPxfjO4HgJgE1zdvYkY6dDI3JOhf+7/8/rWM7aYvRibkRsEQf+C/qa1NjFJb5OpyeByT/OprK9sXVsQ66ZkiTMwwAU/at/w92zB864pJeWY7GXDp1TzVWGv6gAOfGjMywcrANB4SyUaK9CLTVmK6kVYskEKOJ3qGERmfyFM8QqW7ZdhJJ2qZKi2XAiRtR5a6Dw/K7FTKCWjxoZ378RFE4XEhQSaAuXdTyNt6eKFlWgh7xVYjrQ4MmiMUO6KpwxG+1Muicu9lzXdhXt4TsKnZshmA6E03zTCLajQJ23qTaTQZK0IvZmuohbxPSup7Yv0v2DCvRUasRZqTKFyJtVeGTvt6GmFqxKGqsDZlyByVNIn2Hj0JYoi2skVApufWpEEd7pV+yDdjnG3DIQNEARQWJIZQGPeB+lWZivuN1KihLCamA8SB9a5RSVgblzuwl8OZX0BrQ5JmYQNLlIjb9qqzLDCyykj8PHwrN469rYkbTU3HmXlLi9GkxONUk3NUgzv+tCJ2muagqkaZ+/rVf9uTgdUbg/nWaW5FCOKL7GlOWqNz2o7R3fYJaHdD+8wJkx0HhSjLe1dxEFt0F1B7uokOvkrj8PkQfKKpzpi1i23nz8KRBqdYoSjxkrCpSjLlF7PpOWYy1ew93EMj21R1RYYPqYrqYRCxG3X8QrzD4QlxeIIUiEkdDuTRBwXs8HhbDSDoFx1POt++Z9BpHwrQvhg1hB/ii/avKyKMZPiqS0exCUvrXJ22KlQRNX27gdGHVTt6QP0NR9hS9y1ttS78yPEeFZJS5M0RgooPa5oSF95tvOP59qpw1sM6J+C33mP+rx+A+p8qVX82QGSrnyAHy5qBx9y53UHs0J3j3z5lv0orG+2dfhGlzHMQzQNwNwo5bbk+Cigsm13RddoUyo7s+6R4n0HyqWX4IIjHqevJ+dHZLahbkcd0f/altbQyjSsLyPBgPqH4QW38RxPxivbWRqiFnOpjJYncSaPwilLZjl2Cj7n7VdmGFf2TSRxXr/BxqOLl5Z4vz58stejIZ1kqFGdGC6RMdNvtXz+7cbVWi7SXmRgCSZ9azt5NwJ3J/OtSSWqMCnduw/PbU4dGXcTvSd7xNqJ2FNu0y6fZ2lMDTJoLDYcexbrvRWkXfevRH+1jDazyTQFlNxWhzHSLFtDt1pTb0yOkU0ZaZDK6kkFYu2uhZ5pQBBrRPl73VBUcb0szHL/ZFSzTPMdKEZeLOydsswzqrBvATXYjMNZDE92YI8qKwWWu2Hdwh3Bgkfh8RSAWyNqKivJzp1sa+1t9OOleV1rCggV1dotbAjVlpqpTwoiwoBqckch9gLfd8jXmTWf+bxv3x9JH2ovCHuCP5tUMsQ/3IC7knj4VH2VraMjdBDMPBj968a4SIPFavHdjcU1xytvuliQZHWhj2Ixn/S/9hWiLRkcXfQFmto6LLDqv6UDg9nQ+DL961vaDIMTotBLLNoUg6YPhSVuz2KCz/bvPp+lFNcewSUlLoddvLekWn6ER9KxDNX0ntfhHuYW0FRy6xICknjesVaye9wbVwT4ow/KhBpIOTUrNFgF1ZcdXG/51hrtsdK+j28KUwDWyDrg7QZmsZYwsAhwR8DQxtWxssuKT/Qe6G5gQY9w0r7O5X/cX7dr/ADcL8OWPwAJra5JgFuYUoDsZph2a7OJhGuYidTImlJjZnkE+oWfnXPKoRlZWEXNxrzRPtBeDXWC8AwB5DYD5VqTa04dZ5gL8qyuV4Y3b4ncA6m9Bv9TA+Na3NCfYjpua8S9Ss9udXGKET7D7UFeQUc6ALqJO9A3WrKjQgC5hQelFYbDiRU9NXoNxTOToKDHSEA8f0q3JADbuR0YE/CRXt9dk9aj2fXu3k4MH7mjBflQs/wCDf/dkO02bJhrFkux1G4XVVO5UCDt1HeoO120TEk20VuCZOwPl41mv6o329tZt8C3aEerMZ+irWc7M4gren/SRXv4ouOJf0fOZnyzN+LCcxx7PcfUZhiBQ9kl7i9Nx96px5AdzO5Yn617ljM1+2B/kPvVEklZmablS9jTtapW4s86RSfC3Svp4U37ayMRH+kVn/akCmjG4oad8rRps9INm0R1/Ss8G3HrRGKvNpQMfw7UJ7WKCjSoE5NyujZXb4tqFLQdIMeNOM1wuGvYNmAAcL3YgHVG3HNZDPNTeycnlRQ9jGtp0A7Ckja2hpNNuzZZQxXDabpAVV9OnU+NYhVVnO/dkwfLpWqwFxruBvE7lQRNYRLhmnjtuxZxdKn4NCqJ4mupMuI869o0RqfsotLNEW5murqEjejTZS0wDRmBb2WKRj0ZfkTBrq6oMouz68oECvRbFdXVYB77MV57EV1dXCnhsCuOGHgK6urqQxA4ZfAfKonAoeUX5Cva6upAIf8NtDi2o9ABWX7UXFTTaRYBOo+ZIgfQV1dWX5esejV8NJ5UXZJgtFtnPvPA+HhRGd3wqqoEx966ury3/AB/wbu8mxLdeYkceHFDsJrq6s5qRECrsOssPOurq5h8DHGNGnyIqGWHTiivRiw+cxXtdVMf8l/aFf/m/6Yn7Rdi7+JxVy7rXSdKqD0VUC/cE/Go5f/Te4jazcXiIA/eurq95PR85xXKwXE/0xulmYXk3M+6f1qzK/wCnV61cVy6kLvArq6i26CoRssz/ALDX8Rd1hlG0bmkl3+m+K/yQ/Gurq7k0hXBWEZp2MxJFuFSVWD3hSZuxWLmNC/8Amv611dXKboHBWPM47O32t2gEEqIPeXw9azz5FfWe5/7J+tdXUIyYmaCs0OR4N7eEvoyxqBjcHpHQ1iXwjj8MH1H611dTQbsXJqKo89ifD7V5XV1XIWz/2Q=="

interface Bid {
    amount: number,
    userId: mongoose.Types.ObjectId,
}
interface Product {
    _id:string;
    name: string;
    description: string;
    originalPrice: number;
    image: string;
    maxBid: { type: number; required: true };
    minBid: { type: number; required: true };
    sold: boolean;
    sellPrice: number;
    sellerId: string;
    buyerId: string;
    bids: Bid[];
  }
interface User {
   fullName:string,
    hostelName:string,
    hostelRoom:string,   
}

function AddProduct(){
   
   
    const navigate = useNavigate();

    return <>
    <nav><img src={BackButton} onClick={() => navigate(-1)} alt="" /></nav>
     <div style={{display:"inline-grid",  gridTemplateColumns:"1fr 1fr",width:"100%"}}>
     <div style={{height:"85vh", width:"75%" ,backgroundColor:"yellow"}}>
         <div style={{width:"100%",height:"30vh"}}>
           <CameraView/>
         </div>
       
       </div>
       <div style={{height:"85vh",  width:"75%" ,backgroundColor:"green"}}>
           
     <AddProductCard/>
       </div>
        
     </div>
    </>
}



import Webcam from 'react-webcam'
// const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}

// function downloadFile(file) {
//     const url = URL.createObjectURL(file);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = file.name;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     // Revoke the Object URL to free up resources
//     URL.revokeObjectURL(url);
//   }
  


const CameraView = () => {
  const [image,setImage]=useRecoilState(imageState)
  const [picture, setPicture] = useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null);

  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = Buffer.from(arr[arr.length - 1], 'base64');
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr[i];
    }

    return new File([u8arr], filename, { type: mime });
  }

  const capture = React.useCallback(() => {
    const currentWebcamRef = webcamRef.current;

    if (currentWebcamRef) {
      // Capture picture
      const pictureSrc = currentWebcamRef.getScreenshot();
      console.log(pictureSrc);

      // Ensure pictureSrc is either a string or null before setting state
      setPicture(pictureSrc || null);

      // Convert to File and set state
      const file = dataURLtoFile(pictureSrc?pictureSrc:"", 'image.jpeg');
      setPicture(pictureSrc || null);
      if(pictureSrc!=null){
      setImage(pictureSrc)}
     
      return file;
    } else {
      console.error("Webcam reference is null.");
      return null; // or handle the case where the webcamRef is null
    }
  }, []); // Empty dependency array

  return (
    <div>
    <h2 className="mb-5 text-center">
      React Photo Capture using Webcam Examle
    </h2>
    <div>
      {picture == null ? (
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          width={400}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          mirrored={true}
        />
      ) : (
        <img src={picture} />
      )}
    </div>
    <div>
      {picture != null ? (
        <button
          onClick={(e) => {
            e.preventDefault()
            setPicture(null)

          }}
          className="btn btn-primary"
        >
          Retake
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault()
            capture()
           
          }}
          className="btn btn-danger"
        >
          Capture
        </button>
      )}
    </div>
  </div>
  );
};







const AddProductCard= ()=>{
  const [activeListItem,setActiveListItem]=useRecoilState(activeListItemstate);
  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [originalPrice,setOriginalPrice]=useState(0);
  const [maxBid,setMaxBid]=useState(0);
  const [minBid,setMinBid]=useState(0);
  const [image,setImage] = useRecoilState(imageState)
  
  const navigate = useNavigate();
  useEffect(()=>{
    console.log("image set");
    
    setImage(imageLink2)
  },[])


  const handleAddProduct = async () => {
     let body = {name,description,originalPrice,image,maxBid,minBid,}
      const authorization = "Bearer "+localStorage.getItem('token')
      console.log(authorization);
      console.log(body);
      
      const response = await axios.post("http://localhost:4242/general/addProduct", body,{
        headers:{
          Authorization:authorization
        }
      });
     
      if (response.status==201) {
          console.log(response.data);
          navigate("/home")
          setActiveListItem(3);

      } else {
          console.log(response);
          
          alert("invalid credentials");
      }
  };
  

  return <div >
    <h2>Product Details</h2>
    <h4>Name</h4>
    <input type="text" onChange={(e)=>setName(e.target.value)} />
    <h4>Description</h4>
    <textarea onChange={(e)=>setDescription(e.target.value)} />
    <h4>Original Price</h4>
    <input type="number" onChange={(e)=>setOriginalPrice(Number(e.target.value))} /><span>INR</span>
    <h4>Max Bid Price</h4>
    <input type="number" onChange={(e)=>setMaxBid(Number(e.target.value))} /><span>INR</span>
    <h4>Min Bid Price</h4>
    <input type="number" onChange={(e)=>setMinBid(Number(e.target.value))} /><span>INR</span>
    <div><button onClick={handleAddProduct}>AddProduct</button></div>
  </div>
}

export default AddProduct;