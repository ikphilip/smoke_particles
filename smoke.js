class Particle {
  constructor (object, count, x, y, size) {
    this.object = object
    this.x = x
    this.y = y + (size * Math.random())
    this.scale = parseFloat(3/10) * size
    this.duration = Math.random() * 10000
    this.grow = this.scale + (size * Math.random())
    this.velX = (Math.random() < 0.5 ? -1 : 1) * parseFloat(1/2) * size
    this.maxVelY = size / 2
    this.minVelY = 2 * size
    this.velY = (size * 2 * Math.random()) + size * 2
    this.count = count
    this.id = `smoke-${this.object.id}-${this.count}`

    this.emit()
  }

  emit () {
    d3.select(this.object)
      .append('circle')
      .attr('id', `smoke-${this.object.id}-${this.count}`)
      .attr('class', 'particle')
      .attr('cx', this.x)
      .attr('cy', this.y)
      .attr('r', this.scale)
      .attr('fill', '#000000')
      .attr('opacity', '0.5')
      .transition().duration(this.duration)
      .attr('cy', this.y - this.velY)
      .attr('cx', this.x + this.velX)
      .attr('r', this.grow)
      .attr('opacity', '0')
      .on('end', () => {
        document.getElementById(`smoke-${this.object.id}-${this.count}`).remove()
      })
  }
}

class Smoke {
  constructor (id = 1) {
    this.id = id
    this.particles = []
    this.limit = 30 // Max number of particles.
    this.step = 10 // Max particles created per interval.
    this.created = 0 // A incrementing numeric id for each particle.
    this.interval = 400 // How often to add new particles.
  }

  startAnimation () {
    setInterval(() => {
      const filter = this.particles.filter(p => {
        return document.getElementById(p.id) !== null
      })

      this.particles = filter
      let currentStep = 0

      while (this.particles.length < this.limit && currentStep < this.step) {
        const point = document.querySelector(`#smoke`)
        this.particles.push(new Particle(point, this.created, 0, -15, 25))
        this.created += 1
        currentStep += 1
      }
    }, this.interval)
  }
}
