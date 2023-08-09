﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.DTOs.Members
{
    public class NewCityDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
    }
}
